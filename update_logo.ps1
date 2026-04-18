$oldPath = '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>'
$newPath = '<path d="M3 11c0 5 4 9 9 9s9-4 9-9"></path><path d="M12 11V3"></path><path d="M12 7c2 0 4-1 5-3"></path><path d="M12 7c-2 0-4-1-5-3"></path>'

$files = Get-ChildItem -Filter *.html
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    if ($content.Contains($oldPath)) {
        $newContent = $content.Replace($oldPath, $newPath)
        [System.IO.File]::WriteAllText($file.FullName, $newContent)
        Write-Host "Updated $($file.Name)"
    }
}
