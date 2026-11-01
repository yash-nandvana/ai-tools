Add-Type -AssemblyName System.Drawing

function Draw-DevAtlasIcon {
    param(
        [int]$Size,
        [string]$OutputPath
    )

    $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Background gradient (Espresso Brown)
    $rect = New-Object System.Drawing.Rectangle(0, 0, $Size, $Size)
    $color1 = [System.Drawing.ColorTranslator]::FromHtml("#783F27")
    $color2 = [System.Drawing.ColorTranslator]::FromHtml("#9C5234")
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $color1, $color2, 45.0)

    # Rounded rectangle path
    $radius = [int]($Size * 0.25)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = $radius * 2
    $arcRect = New-Object System.Drawing.Rectangle(0, 0, $diameter, $diameter)

    $path.AddArc($arcRect, 180, 90)
    $arcRect.X = $Size - $diameter
    $path.AddArc($arcRect, 270, 90)
    $arcRect.Y = $Size - $diameter
    $path.AddArc($arcRect, 0, 90)
    $arcRect.X = 0
    $path.AddArc($arcRect, 90, 90)
    $path.CloseFigure()

    $g.FillPath($brush, $path)

    # Concentric rings
    $whitePen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, [float]($Size * 0.08))
    $center = $Size / 2.0
    $outerR = $Size * 0.29
    $g.DrawEllipse($whitePen, [float]($center - $outerR), [float]($center - $outerR), [float]($outerR * 2), [float]($outerR * 2))

    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $innerR = $Size * 0.125
    $g.FillEllipse($whiteBrush, [float]($center - $innerR), [float]($center - $innerR), [float]($innerR * 2), [float]($innerR * 2))

    # Save
    $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)

    $whiteBrush.Dispose()
    $whitePen.Dispose()
    $path.Dispose()
    $brush.Dispose()
    $g.Dispose()
    $bmp.Dispose()
    Write-Output "Generated: $OutputPath ($($Size)x$($Size))"
}

function Draw-OgImage {
    param([string]$OutputPath)
    $width = 1200
    $height = 630

    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    # Dark luxury background #070B14
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#070B14"))
    $g.FillRectangle($bgBrush, 0, 0, $width, $height)

    # Top Brown Gradient Strip
    $topRect = New-Object System.Drawing.Rectangle(0, 0, $width, 8)
    $stripBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($topRect, [System.Drawing.ColorTranslator]::FromHtml("#783F27"), [System.Drawing.ColorTranslator]::FromHtml("#9C5234"), 0.0)
    $g.FillRectangle($stripBrush, $topRect)

    # Logo Emblem
    $logoSize = 130
    $logoX = 100
    $logoY = 120
    $logoRect = New-Object System.Drawing.Rectangle($logoX, $logoY, $logoSize, $logoSize)
    $color1 = [System.Drawing.ColorTranslator]::FromHtml("#783F27")
    $color2 = [System.Drawing.ColorTranslator]::FromHtml("#9C5234")
    $logoBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($logoRect, $color1, $color2, 45.0)

    $radius = 32
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = $radius * 2
    $arcRect = New-Object System.Drawing.Rectangle($logoX, $logoY, $diameter, $diameter)
    $path.AddArc($arcRect, 180, 90)
    $arcRect.X = $logoX + $logoSize - $diameter
    $path.AddArc($arcRect, 270, 90)
    $arcRect.Y = $logoY + $logoSize - $diameter
    $path.AddArc($arcRect, 0, 90)
    $arcRect.X = $logoX
    $path.AddArc($arcRect, 90, 90)
    $path.CloseFigure()
    $g.FillPath($logoBrush, $path)

    $whitePen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 10.0)
    $center = $logoX + ($logoSize / 2.0)
    $centerY = $logoY + ($logoSize / 2.0)
    $outerR = 38.0
    $g.DrawEllipse($whitePen, [float]($center - $outerR), [float]($centerY - $outerR), [float]($outerR * 2), [float]($outerR * 2))

    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $innerR = 16.0
    $g.FillEllipse($whiteBrush, [float]($center - $innerR), [float]($centerY - $innerR), [float]($innerR * 2), [float]($innerR * 2))

    # Title: DevAtlas
    $titleFont = New-Object System.Drawing.Font("Segoe UI", 52, [System.Drawing.FontStyle]::Bold)
    $titleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $g.DrawString("DevAtlas", $titleFont, $titleBrush, ($logoX + $logoSize + 30), ($logoY + 20))

    # PRO badge
    $badgeRect = New-Object System.Drawing.Rectangle(($logoX + $logoSize + 280), ($logoY + 38), 65, 30)
    $badgeBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($badgeRect, [System.Drawing.ColorTranslator]::FromHtml("#0D9488"), [System.Drawing.ColorTranslator]::FromHtml("#06B6D4"), 0.0)
    $badgePath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $badgePath.AddRectangle($badgeRect)
    $g.FillPath($badgeBrush, $badgePath)
    $badgeFont = New-Object System.Drawing.Font("Segoe UI", 12, [System.Drawing.FontStyle]::Bold)
    $g.DrawString("PRO", $badgeFont, $whiteBrush, ($logoX + $logoSize + 292), ($logoY + 42))

    # Subtitle
    $subFont = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Regular)
    $subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#94A3B8"))
    $g.DrawString("Discover 3,300+ Curated Developer Tools, AI Agents & Repositories", $subFont, $subBrush, 100, 300)

    # Highlights
    $tagFont = New-Object System.Drawing.Font("Segoe UI", 20, [System.Drawing.FontStyle]::Bold)
    $tagBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#14B8A6"))
    $g.DrawString("2,122+ Verified Tools   •   1,253+ Open Source Repos   •   27 Categories", $tagFont, $tagBrush, 100, 460)

    $urlFont = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
    $urlBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#64748B"))
    $g.DrawString("devatlas.dev", $urlFont, $urlBrush, 100, 540)

    $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Generated OG Image: $OutputPath (1200x630)"
}

New-Item -ItemType Directory -Force -Path "public" | Out-Null
Draw-DevAtlasIcon -Size 48 -OutputPath "public/icon-48.png"
Draw-DevAtlasIcon -Size 180 -OutputPath "public/apple-touch-icon.png"
Draw-DevAtlasIcon -Size 192 -OutputPath "public/icon-192.png"
Draw-DevAtlasIcon -Size 512 -OutputPath "public/icon-512.png"
Draw-OgImage -OutputPath "public/og-image.png"

Write-Output "Favicon and icons setup complete!"
