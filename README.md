# WebProject - Purpose-Based Place Recommendation Website

You can access the website : https://imduckman.github.io/NearCampus/

Kyonggi University AI Computer Engineering - 2025 Spring Web Programming Project

---

## Overview
This project is a responsive website designed to support campus life by recommending various places (cafes, restaurants, activities, bars) according to student needs.

- Real-time place information, photo slideshows, reviews, and map integration
- Fully responsive for both PC and mobile devices

---

## Main Features
- Recommendation lists for cafes, restaurants, activities, and bars by category
- Photo slideshows and reviews/ratings for each place
- Integrated Kakao Map modal for detailed location information
- Responsive design using Bootstrap
- Korean web fonts, animations, and filtering features

---

## Getting Started

1. Download or copy the entire project folder
2. Open `index.html` in your web browser  
   (No separate server or installation required; works in a local environment)

Requirements  
- Internet connection (for Kakao Map, Google Fonts, and other external CDNs)
- Latest version of Chrome, Edge, or another modern browser is recommended

---

## Folder Structure
NearCampus/
├── index.html
├── Cafe.html
├── Food.html
├── Activities.html
├── Drink.html
├── assets/
│ ├── css/
│ ├── images/
│ └── js/
├── vendor/
│ ├── bootstrap/
│ └── jquery/
├── README.md

## Getting Started / Execution Guide

### 1. Local Execution

You can run this project locally on your computer without any special server or additional installation.

**Steps:**
1. Download or clone this repository:
   
git clone https://github.com/imduckman/NearCampus.git

or download as a ZIP and extract it.

2. Open the project folder.

3. Double-click the `index.html` file (or right-click and choose "Open with" → your web browser).

4. The website should open directly in your browser.  
(Make sure your internet connection is on, for Kakao Map and Google Fonts.)

**Requirements:**  
- A modern web browser (Chrome, Edge, Firefox, Safari, etc.)  
- Internet connection (for external resources like Kakao Map API and Google Fonts)

---

### 2. Online Deployment via GitHub Pages

If you want to view the site live via GitHub Pages:

1. Make sure `index.html` is in the root of your repository.

2. Go to your repository on GitHub > **Settings** > **Pages**.

3. In the **Source** section, select the `main` branch and `/ (root)` folder.

4. Click **Save**.  
GitHub will publish your website at  
`https://[your-username].github.io/[your-repo]/`

**Example:**  

https://imduckman.github.io/NearCampus/


- All project features (navigation, maps, reviews, image slides) should work online just like locally.
- It may take a few minutes after each push for the page to update.

---

### 3. Troubleshooting

- If maps or web fonts are not displayed, check your internet connection.
- If the site does not open, make sure all files are in place and `index.html` is in the root directory.
- If using GitHub Pages and you get a 404 error, double-check the GitHub Pages settings (branch and folder).

---

If you encounter any issues, please open an issue on the repository or contact the authors.

---

- index.html : Main page
- Cafe.html, Food.html, etc. : Category-specific recommendation pages
- assets/css : Stylesheets
- assets/js : JavaScript (slideshow, popup, map integration, etc.)
- assets/images : Place images and logos
- vendor/bootstrap : Bootstrap and other external libraries

---

## Technologies Used
- HTML5, CSS3, JavaScript (Vanilla JS)
- Bootstrap 4
- Google Fonts (Do Hyeon, Poppins, etc.)
- Kakao Map API
- jQuery, Isotope, Owl Carousel, WOW.js, etc.

---

## Authors

- Kyonggi University AI Computer Engineering  
  - Kangmin Lee, Hwiyeon Won, Daesung Lee

---

## License
- For educational and non-commercial use only
- Refer to individual licenses for open-source libraries (Bootstrap, Kakao Map, etc.)

---

## References
- [Kakao Map API](https://apis.map.kakao.com/)
- [Google Fonts](https://fonts.google.com/)
- [Bootstrap](https://getbootstrap.com/)
