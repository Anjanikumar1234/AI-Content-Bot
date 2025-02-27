# How to Obtain Your Google Generative AI API Key

To get your API key for Google Generative AI, follow these steps:

1. **Create a Google Cloud Account**:
   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - If you don't have an account, sign up for one.

2. **Create a New Project**:
   - In the Google Cloud Console, click on the project drop-down and select "New Project".
   - Enter a name for your project and click "Create".

3. **Enable the Generative AI API**:
   - In the left sidebar, navigate to "APIs & Services" > "Library".
   - Search for "Google Generative AI" and click on it.
   - Click the "Enable" button to enable the API for your project.

4. **Create Credentials**:
   - In the left sidebar, navigate to "APIs & Services" > "Credentials".
   - Click on "Create Credentials" and select "API Key".
   - Your new API key will be created and displayed. Copy this key.

5. **Add the API Key to Your Project**:
   - Open your `vite.config.ts` file in your project.
   - Replace `'YOUR-API-KEY-HERE'` with your actual API key.

6. **Secure Your API Key**:
   - Make sure to keep your API key secure and do not expose it in public repositories.

Now you can use your API key to access the Google Generative AI services.
