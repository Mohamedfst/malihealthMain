# Documentation for Supabase/PowerSync/Expo.

# **About The Project:**

---

This is the project setup for a telemedicine application that empowers health providers in Mali to give quality and timely care to the Malian population.

This will include the step-by-step guidelines for running this application locally on both iPhone and Android simulators in your local environment.

---

# Dependencies:

These libraries are prerequisites for the effective local operation of the applications.

- NodeJS
- CocoaPods

---

### Getting Started:

These are the instructions on setting up your project locally. To get a local copy up and running, follow these steps.

- Download and install **NodeJS** and **CocoaPods** on your computer as package managers to allow the simulators to run on your computer.
    - References:
        1. https://nodejs.org/en/download/prebuilt-installer 
        2. https://cocoapods.org/ 

- **Download Xcode for iPhone Simulator:**
    - Go to App Store, search, and download Xcode
    - Follow the installation instructions and choose the macOS and iOS platforms you want to develop.
        - References:
            1. https://reactnative.dev/docs/set-up-your-environment 
            2. https://www.youtube.com/watch?v=F6QZ2atZrDw 
            3. https://www.apple.com/app-store/ 

- **Download Android Studio for Android Simulator:**
    - Head to this https://developer.android.com/studio and choose the latest Android studio for your operating system.
    - Follow the installation instructions to have it installed on your computer
    - Get a virtual device:
        1. Go to a device manager and select Create a virtual device. ****
        2. Choose a device definition/model. Example: iPhone 8a.
        3. Click next and choose the right API for your chip model.
        4. Lastly, click next and finish
    - References:
        - https://reactnative.dev/docs/set-up-your-environment
        - https://www.youtube.com/watch?v=8ILww0tUSxw&t=342s
        - https://developer.android.com/studio
    
- **Clone the project on GitHub:**
    - Enter this → git clone https://github.com/Mohamedfst/malihealthMain
    - Download all the dependencies by doing the following:
        - cd malihealthMain and npm install
    - Start the project by doing the following:
        - npm run ios (for iPhone simulator)
        - npm run android (for android simulator)
