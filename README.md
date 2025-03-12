# AI Content Generation Bot

## 🚀 Introduction
Welcome to the **AI Content Generation Bot** – a modern web application that harnesses the power of Google's Generative AI API to generate various types of content with just a simple prompt. Whether you need creative writing, technical content, or brainstorming ideas, this tool has you covered!

---

## 📋 Requirements
Before you begin, ensure you have the following:
- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **Google AI Studio API Key**

---

## 🛠 Project Setup
Follow these steps to set up the project:

1️⃣ **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   ```

2️⃣ **Navigate to the project directory**
   ```sh
   cd <YOUR_PROJECT_NAME>
   ```

3️⃣ **Install dependencies**
   ```sh
   npm install
   ```

4️⃣ **Configure API Key**
   - Open `vite.config.ts`
   - Locate **line 24** and insert your API key:
     ```typescript
     GOOGLE_API_KEY: "your_api_key_here"
     ```

5️⃣ **Start the development server**
   ```sh
   npm run dev
   ```

---

## 🔑 How to Get Your API Key
Follow these simple steps to obtain your API key:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API Key"**
4. Choose to **create a new API key** or use an existing one
5. Copy your API key
6. Paste it into `vite.config.ts` (line 24)
7. Keep your API key secure and **never share it publicly**

---

## ✨ Features
- 📝 **AI-Powered Content Generation**
- 📂 **Multiple Content Type Options**
- ⚡ **Real-Time Response**
- 🎨 **User-Friendly Interface**
- 🎯 **Customizable Prompts**

---

## 🎯 How to Use
1️⃣ Start the application using:
   ```sh
   npm run dev
   ```
2️⃣ Open your browser and go to: `http://localhost:8000`
3️⃣ Enter your **prompt**
4️⃣ Select the **desired content type**
5️⃣ Click **"Generate"** and let AI do the magic! ✨

---

## 💡 Best Practices
✅ Keep your prompts **clear and specific**  
✅ Always **review and verify** generated content  
✅ **Avoid** sharing sensitive information in prompts  
✅ Secure your API key & never expose it publicly  
✅ Use appropriate content types for **best results**

---

## 🔧 Troubleshooting
If you run into issues, try the following:

1️⃣ Ensure your **API key** is correctly set in `vite.config.ts` (line 24)  
2️⃣ Check for **extra spaces or quotes** around your API key  
3️⃣ Reinstall dependencies: `npm install`  
4️⃣ Verify Node.js version: `node -v`  
5️⃣ Clear your browser cache if the UI isn’t updating  
6️⃣ Check browser console (`F12` → Console) for errors  
7️⃣ Ensure you're using the correct **port (8000)**  
8️⃣ If facing API errors, confirm your key is **valid** in Google AI Studio  

---

## ⏹ How to Stop the Server
To end your session:
- Press **`Ctrl + C`** in the terminal
- Close any associated browser windows

---

## 🤝 Contributing
Want to contribute? Follow these steps:

1️⃣ **Fork the repository**  
2️⃣ **Create a feature branch** (`git checkout -b feature-name`)  
3️⃣ **Commit your changes** (`git commit -m "Your message"`)  
4️⃣ **Push to the branch** (`git push origin feature-name`)  
5️⃣ **Create a Pull Request** 🚀

---

## 🔒 Security Notes
- **Never share your API key publicly**
- **Avoid committing `vite.config.ts` with your API key**
- **Keep dependencies updated**
- **Review AI-generated content before using**
- **Follow Google's AI usage guidelines**

---

## 📜 License
This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

🎉 **Happy Coding & AI-Powered Creativity!** 🚀

