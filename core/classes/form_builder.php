<?php

class form_builder extends dblyze {

    public $table;
    public $source;
    public $labels;
    public $exceptions;

    protected $db;

    public function __construct() {
        // Call database.
        global $db;
        $this -> db = $db;
        // Call parent constructor.
        parent::__construct();
    }

    /**
     * Builds form from configuration.
     *
     * ## Config:
     *
     * __String__ --_table_
     *
     * __String__ --_action_
     *
     * __String__ --_method_
     *
     * __Array__ _source_
     *
     * __Array__ _labels_
     *
     * __Array__ _exceptions_
     *
     * @param array $config
     *
     * @return string
     */
    public function build($config) {
        $defaults = [
            'labels' => [],
            'exceptions' => []
        ];
        $config = array_merge($defaults, $config);

        $this -> table = $config['table'];
        $this -> source = $config['source'];
        $this -> labels = $config['labels'];
        $this -> exceptions = $config['exceptions'];

        $table_info = parent::table_info($this->table);

        $form = "<form
            class='form__main'
            id='$this->table'
            action='$config[action]'
            method='$config[method]'
            novalidate
            enctype='multipart/form-data'
        >";

        if (!empty($this->labels['__form_title'])) {
            $subtitle = !empty($this->labels['__form_subtitle'])
                ? $this->labels['__form_subtitle']
                : "";
            $form .= $this -> title($this->labels['__form_title'], $subtitle);
        }

        // Iterate over table info and add inputs.
        foreach ($table_info as $column) {
            // Don't add primary keys.
            if ($column['Key'] !== 'PRI') {

                $icfg = $this -> input_config($column);

                // Check if input is in exceptions.
                if (array_key_exists($column['Field'], $this->exceptions)) {
                    if ($this->exceptions[$column['Field']]) {
                        // Set input as  defined in exception.
                        $input = $this->exceptions[$column['Field']];
                        // Insert handled input.
                        $form .= $this -> handle_exception(
                            $input,
                            $icfg['id'],
                            $icfg['label'],
                            $icfg['required'],
                            $icfg['value']
                        );
                    }
                } else {
                    // TODO: Handle many-to-many case.
                    // Handle many-to-many.
                    if ($column['Key'] === 'MTM')
                        $form .= $this -> many_to_many($column);

                    // TODO: Handle one-to-many case.
                    // Handle one-to-many.
                    if ($column['Key'] === 'MUL')
                        $form .= $this -> one_to_many($column, $icfg);

                    // TODO: Handle regular input cases.
                    // Handle regular input.
                    else
                        $form .= $this -> input($column, $icfg);

                }

            }
        }

        // Add submit button.
        $submit_child = array_key_exists('__submit_child', $this->labels)
            ? $this -> labels['__submit_child']
            : "Submit";
        $form .= "<div class='form__group--right'>
                      <button class='button__raised--primary'>$submit_child</button>
                  </div>";

        // End form tag.
        $form .= "</form>";

        // Return finished form.
        return $form;
    }

    public function input($column, $input_config) {
        if (!isset($input_config['name']))
            $input_config['name'] = $input_config['id'];
        if (!isset($input_config['contained']))
            $input_config['contained'] = true;

        $input = new Input([
            'id' => $input_config['id'],
            'name' => $input_config['name'],
            'label' => $input_config['label'],
            'required' => $input_config['required'],
            'value' => $input_config['value'],
            'contained' => $input_config['contained']
        ]);

        // Image.
        if ($column['Comment'] === "file(image)")
            return $input -> image();

        // Regular input field.
        elseif (starts_with('varchar', $column['Type'])) {
            switch ($column['Field']) {
                case 'email': $type = "email"; break;
                case 'password': $type = "password"; break;
                default: $type = "text"; break;
            }
            return $input -> field($type);
        }

        // Small text-area.
        elseif ($column['Type'] == 'tinytext')
            return $input -> textarea(3);

        // Medium-sized text-area.
        elseif ($column['Type'] == 'mediumtext')
            return $input -> textarea(5);

        // Large text-area.
        elseif ($column['Type'] == 'text')
            return $input -> textarea(7);

        // Toggle.
        elseif ($column['Type'] == 'tinyint(1)')
            return $input -> toggle($column['Default']);

        // Number field.
        elseif ($column['Type'] == 'int(11)')
            return $input -> number();

        // Return regular input field if you don't know what to do.
        else
            return $input -> field();
    }

    public function input_config($column) {
        $config = [];
        // Define input id.
        $config['id'] = $this -> table."_".$column['Field'];
        // Define input label.
        $config['label'] = array_key_exists($column['Field'], $this->labels)
            // Set label as defined in labels array.
            ? $this->labels[$column['Field']]
            // Use styled column name as label.
            : ucfirst(str_replace('_', ' ', $column['Field']));
        // Define input required state.
        $config['required'] = $column['Null'] === 'NO'
            // Required.
            ? "required"
            // Not required.
            : "";
        // Define input value.
        $config['value'] = array_key_exists($column['Field'], $this->source)
            // Value is defined in source array.
            ? $this -> source[$column['Field']]
            // No value given.
            : null;

        // Return input config.
        return $config;
    }

    public function one_to_many($column, $input_config, $table = "") {
        if (empty($table)) {
            $table_rel_out = parent::relations([
                'TABLE_NAME' => $this -> table
            ]);
            foreach ($table_rel_out as $relation) {
                if ($relation['REFERENCED_TABLE_NAME']) {
                    $table = $relation['REFERENCED_TABLE_NAME'];
                }
            }
        }

        // Get data from foreign table.
        $foreign_data = $this -> foreign_data([
            'table' => $table,
            'order_by' => "2"
        ]);

        // Build select box options from foreign data.
        $options = "";
        foreach ($foreign_data as $row) {
            $selected = array_key_exists($column['Field'], $this->source)
                        &&
                        $row[1] === $this->source[$column['Field']]
                ? "selected"
                : "";
            $options .= "<option value='$row[id]' $selected>$row[name]</option>";
        }

        if (!isset($input_config['name']))
            $input_config['name'] = $input_config['id'];
        if (!isset($input_config['contained']))
            $input_config['contained'] = true;

        $input = new Input([
            'id' => $input_config['id'],
            'name' => $input_config['name'],
            'label' => $input_config['label'],
            'required' => $input_config['required'],
            'value' => $input_config['value'],
            'contained' => $input_config['contained']
        ]);

        // Return input.
        if (count($foreign_data) > 5) {
            $json_list = json_encode($foreign_data);
            return $input -> search_box($json_list);
        } else {
            return $input -> select([ 'options' => $options ]);
        }
    }

    public function many_to_many($column) {
        $foreign_table = $column['Field'];
        $columns = $column['Columns'];
        $title = ucfirst(str_replace('_', ' ', $foreign_table));

        $class_name = count($columns) === 1
            // One column - inline inputs.
            ? "form__group-items"
            // More columns - inputs grouped in rows.
            : "form__group-items--rows";

        // Add some initial markup.
        $many_to_many = "<div class='$class_name form_items'>
                            <div class='title'>$title</div>
                            <div class='form_items_model'>";

        foreach ($columns as $column) {
            // Don't add primary keys.
            if ($column['Key'] !== 'PRI') {

                // Define input config.
                $icfg = $this -> input_config($column);
                $icfg['name'] = $icfg['id']."[]";
                $icfg['contained'] = false;

                // Handle one-to-many.
                $many_to_many .= $this -> one_to_many($column, $icfg, $foreign_table);

                // Handle regular inputs.

            }
        }

        // Return input(s).
        return $many_to_many;
    }

    /**
     * Handles given input template.
     *
     * @param $input - Template input.
     * @param $id
     * @param $label
     * @param $required
     * @param $value
     *
     * @return mixed
     */
    public function handle_exception($input, $id, $label, $required, $value) {
        if (strpos($input, '___id___'))
            // Replace id placeholder with actual id.
            $input = str_replace('___id___', $id, $input);
        if (strpos($input, '___label___'))
            // Replace label placeholder with actual label.
            $input = str_replace('___label___', $label, $input);
        if (strpos($input, '___required___'))
            // Replace required placeholder with actual required state.
            $input = str_replace('___required___', $required, $input);
        if (strpos($input, '___value___'))
            // Replace value placeholder with actual value.
            $input = str_replace('___value___', $value, $input);

        // Return finished input.
        return $input;
    }

    /**
     * Build title component for form.
     *
     * @param $title
     * @param $subtitle
     * @return string
     */
    public function title($title, $subtitle) {
        $title_string = "<div class='form__group--title'>";
        $title_string .= "<span class='title'>$title</span>";
        if ($subtitle) $title_string .= "<span class='subtitle'>$subtitle</span>";
        $title_string .= "</div>";
        return $title_string;
    }

    /**
     * Returns foreign data from table.
     *
     * ## Config
     *
     * *__String__ table
     *
     * __String__ order_by
     *
     * __Bool__ filter_deleted
     *
     * @param $config
     *
     * @return array
     */
    public function foreign_data($config) {
        $defaults = [
            'order_by' => '',
            'filter_deleted' => true
        ];
        $config = array_merge($defaults, $config);

        // Build SQL query.
        $sql = "SELECT *
                  FROM $config[table]";

        if ($config['filter_deleted'])
            $sql .= " WHERE deleted = 0";
        if (!empty($config['order_by']))
            $sql .= " ORDER BY $config[order_by]";

        // Return foreign data.
        return $this -> db -> fetch_array($sql);
    }

}

function starts_with($needle, $haystack) {
    $length = strlen($needle);
    return substr($haystack, 0, $length) === $needle;
}