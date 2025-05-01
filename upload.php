<?php
// upload.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['profileImage']) {
        $targetDir = "photos/";
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }
        
        $filename = basename($_POST['filename']);
        $targetFile = $targetDir . $filename;
        
        // Vérifier le type de fichier
        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
        
        if (in_array($imageFileType, $allowedTypes)) {
            if (move_uploaded_file($_FILES['profileImage']['tmp_name'], $targetFile)) {
                echo json_encode(['success' => true]);
                exit;
            }
        }
    }
}

echo json_encode(['success' => false]);
?>
