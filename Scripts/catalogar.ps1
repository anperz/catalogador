Import-Csv -Delimiter ';' -Path .\export.csv | 

ForEach-Object { 
    New-Item -ItemType File -Path $_.FinalPath -Force
}

Import-Csv -Delimiter ';' -Path .\export.csv | 

ForEach-Object { 
    Move-Item -Path $_.FullName -Destination $_.FinalPath -Force -Verbose
}