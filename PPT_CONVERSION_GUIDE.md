# How to Convert Presentation to PowerPoint (PPT)

## Option 1: Using Pandoc (Recommended)

### Installation
```bash
# macOS
brew install pandoc

# Windows
# Download from: https://pandoc.org/installing.html

# Linux
sudo apt-get install pandoc
```

### Conversion Command
```bash
pandoc PROJECT_PRESENTATION.md -o FinSight_Presentation.pptx
```

### With Custom Template
```bash
pandoc PROJECT_PRESENTATION.md -o FinSight_Presentation.pptx \
  --reference-doc=template.pptx
```

## Option 2: Using Online Tools

### Markdown to PPT Converters:
1. **Dillinger.io** - https://dillinger.io/
   - Upload markdown file
   - Export as HTML
   - Open in PowerPoint and save as PPTX

2. **CloudConvert** - https://cloudconvert.com/
   - Convert Markdown → HTML → PPTX

3. **Zamzar** - https://www.zamzar.com/
   - Upload .md file
   - Convert to PPTX

## Option 3: Manual Conversion in PowerPoint

1. Open Microsoft PowerPoint
2. Create a new presentation
3. Copy content from each slide section in PROJECT_PRESENTATION.md
4. Paste into PowerPoint slides
5. Format as needed
6. Add images/charts from the project

## Option 4: Using Google Slides

1. Import PROJECT_PRESENTATION.md content
2. Use Google Slides' import feature
3. Format slides
4. Download as PPTX

## Option 5: Using Reveal.js (HTML Presentation)

I've created an HTML version that can be:
- Opened in browser
- Presented directly
- Screenshot for PPT
- Converted using browser print-to-PDF then to PPT

## Quick Script (macOS/Linux)

```bash
#!/bin/bash
# convert_to_ppt.sh

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null
then
    echo "Pandoc not found. Installing..."
    brew install pandoc  # macOS
    # or: sudo apt-get install pandoc  # Linux
fi

# Convert markdown to PPTX
pandoc PROJECT_PRESENTATION.md \
  -o FinSight_Presentation.pptx \
  --slide-level=2 \
  -t pptx

echo "Presentation created: FinSight_Presentation.pptx"
```

## Tips for Better PPT Output

1. **Add Images**: Include screenshots of:
   - Dashboard interface
   - Document processing flow
   - Architecture diagrams
   - Feature screenshots

2. **Formatting**:
   - Use consistent fonts (Arial, Calibri)
   - Maintain color scheme (Blue/Purple for FinSight)
   - Add company logo to each slide

3. **Charts/Diagrams**:
   - Export architecture diagrams
   - Include performance metrics charts
   - Add user flow diagrams

4. **Animations** (Optional):
   - Slide transitions
   - Bullet point animations
   - Chart reveals

## Recommended Slide Design

- **Title Slide**: FinSight logo + tagline
- **Content Slides**: 
  - Title: Bold, 24-28pt
  - Body: Regular, 14-18pt
  - Use bullet points for lists
  - Include relevant icons/images

## Color Scheme

- Primary: #1E40AF (Deep Indigo Blue)
- Accent: #8B5CF6 (Soft Violet)
- Highlight: #22D3EE (Cyan)
- Background: White/Light Gray
- Text: #0F172A (Dark)

---

**Note**: The markdown file is structured with clear slide separators (---) making it easy to convert to PowerPoint format.

