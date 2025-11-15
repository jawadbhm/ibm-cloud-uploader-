# IBM Cloud Uploader (Mock Dashboard)
A React + TypeScript mock dashboard that simulates uploading files to IBM Cloud Object Storage. Everything runs locally in the browser with simulated progress—no real API calls or cloud credentials.

## 🚀 What it does
- Select a target bucket (`dev-uploads`, `prod-reports`, `archive-logs`)
- Drag & drop or browse files
- Shows file size, progress bar, status, and completion timestamps
- Simulated uploads (0–100%)
- Clear all uploads at any time

## 🛠 Tech Stack
- React
- TypeScript
- Vite
- Tailwind-style utility classes (via CDN)

## ▶️ How to Run Locally
**Requirements:** Node.js

1. Install dependencies:  
   npm install  
2. Start development server:  
   npm run dev  
3. Open the URL shown in the terminal (usually http://localhost:5173)  
4. Build & preview:  
   npm run build  
   npm run preview  
   (or use: npm start)

## 📁 Project Structure
src/  
  App.tsx  
  index.tsx  
  types.ts  
  components/  
    BucketSelector.tsx  
    UploadArea.tsx  
    UploadList.tsx  
    StatusBadge.tsx  
    Icons.tsx  
index.html  
package.json  
tsconfig.json  
vite.config.ts  
README.md  

## 🌱 Why I Built This
I built this project to practice UI patterns, component structure, simulated async workflows, and clean React + TypeScript architecture. It serves as a portfolio piece showcasing frontend engineering fundamentals.

## 🚧 Future Improvements
- Cancel uploads  
- Retry failed uploads  
- File type/size validation  
- LocalStorage history  
- Dark mode  

## 🤝 Contributions
Feel free to open issues or submit pull requests.
