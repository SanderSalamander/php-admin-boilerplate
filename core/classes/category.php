<?php
/**
 * Created by PhpStorm.
 * User: sander
 * Date: 7/25/18
 * Time: 8:47 PM
 */

class Category extends file_upload {

    public $id;
    public $name;
    public $image;

    protected $db;

    public function __construct() {
        global $db;
        $this -> db = $db;
    }

    public function get_list($config = array()) {
        $sql = "SELECT *
                  FROM category
                WHERE
                  deleted = 0";
        if (!empty($config)) {
            $sql .= " LIMIT $config[limit] OFFSET $config[offset]";
        }
        return $this -> db -> fetch_array($sql);
    }
    public function get_item($id) {
        $params = array($id);
        $sql = "SELECT *
                  FROM category
                WHERE
                  id = ?";
        $row = $this -> db -> fetch_array($sql, $params);
        return call_user_func_array('array_merge', $row);
    }

    public function save($destination, $type = 'svg') {

        $image_name = strtolower(str_replace(' ', '_', $this->name));

        if ($this -> id) { // Update:

            // Check if image is different from old image.
            $original_image = $this -> get_item($this -> id)['image'];
            $image_url = $this -> image
                ? parent::image([
                    'destination' => $destination,
                    'name' => $image_name,
                    'type' => $type
                ])
                : $original_image;

            // Set parameters and SQL.
            $params = array(
                $this -> name,
                $image_url,
                $this -> id
            );
            $sql = "UPDATE category SET
                      name = ?,
                      image = ?
                    WHERE
                      id = ?";

            // Update.
            $this -> db -> query($sql, $params);
            return $this -> db -> getinsertid();

        } else { // Create:

            // Upload image.
            $image_url = parent::image([
                'destination' => $destination,
                'name' => $image_name,
                'type' => $type
            ]);

            // Set parameters and SQL.
            $params = array(
                $this -> name,
                $image_url
            );
            $sql = "INSERT INTO
                      category
                        (name, image)
                    VALUES
                      (?, ?)";

            // Insert.
            $this -> db -> query($sql, $params);
            return $this -> db -> getinsertid();

        }

    }

    public function delete($rows, $permanent = false) {

        $update = implode(',', $rows);

        if ($permanent) { // PERMANENT - removes from table.

            $sql = "DELETE
                      FROM category
                    WHERE
                      id IN ($update)";

        } else { // Soft - sets deleted as 1.

            $sql = "UPDATE category SET
                      deleted = 1
                    WHERE
                      id IN ($update)";

        }

        // Execute query.
        $this -> db -> query($sql);

    }
}