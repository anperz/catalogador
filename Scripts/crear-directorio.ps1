Get-ChildItem -Exclude ".\directory.csv"  -Recurse . | 
Sort-Object fullname | Select-Object FullName, Name, Extension, Length, Radicado, Date, Time, Organo, Sala, Reserved, Virtual, Consecutivo, NewName, NameLength, Category, FinalPath | 
Export-Csv -Force -Delimiter ';' -Encoding UTF8 -Path .\directory.csv
