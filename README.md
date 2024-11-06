# chemo-companion

## Introduction
ChemoCompanion is an all-in-one innovative tool designed to support patients undergoing chemotherapy by providing valuable resources and facilitating seamless communication with their medical team. The website addresses key gaps in current solutions by enabling real-time sharing of health statistics, offering an empathetic AI chatbot for guidance, allowing emergency nurse connections, and providing stress-relief activities. ChemoCompanion aims to reduce patient stress, enhance the care experience, and ensure robust privacy through its HIPPA compliance. By creating distinct user experiences for patients and medical staff, the platform ensures efficient, secure, and supportive interactions throughout the treatment journey.

## Plan of Work
We plan to develop a HIPAA-compliant website that acts as a platform for patients undergoing chemotherapy treatment. It serves two main purposes: 1) an avenue for the patient themselves to gain resources to help them navigate their experience and relieve their stress and 2) a bridge between the patient and medical staff, allowing seamless communication between the two as well as easy health statistic sharing.

In addressing the concerns highlighted in the research section, our proposed platform will fill several gaps in existing solutions:

By allowing patients to share their health statistics in real-time with their medical team and receive direct feedback, we aim to reduce the stress and uncertainty that often accompanies chemotherapy treatments. 

The integration of an AI chatbot is another key feature, addressing both practical and emotional needs. This can provide patients with guidance between doctor visits, helping them manage side effects and symptoms without feeling the need for constant medical intervention.  The chatbot will also be able to communicate in an empathetic and supportive tone with the patient. This added layer of on-demand support can make a huge difference for patients, helping them feel less isolated and more understood as they go through treatment.

Additional features including an alerting and notification system and HIPAA compliance will further enhance the platform's utility and safety. The alerting and notification system will allow patients to receive important updates from medical staff, such as reminders about medication, upcoming appointments, or general health tips tailored to their treatment plan. This real-time communication will help patients stay on top of their care and ensure that they feel supported between their medical visits. Notifications can also include updates about new resources added to the platform, keeping patients informed of tools that could further improve their well-being.

Ensuring the platform is fully HIPAA-compliant is another critical feature. By adhering to the strict privacy and security standards set forth by HIPAA, we will safeguard sensitive patient data, including health statistics, personal information, and medical history. This will ensure that both patients and medical staff can confidently use the platform, knowing that all shared data is encrypted and handled with the highest level of security.

Finally, the user login system will create separate experiences for patients and medical staff, ensuring each has access to what they need. Patients can log in to track their health stats, record symptoms, and easily communicate with their care team, giving them control over their treatment in a way that’s simple and secure. Medical staff, on the other hand, will have their own admin accounts, which allow them to keep an eye on patient health data, send important updates, and respond to patient questions. By keeping these roles distinct, the platform protects privacy while making it easier for everyone to stay connected and informed.

## Technologies and Languages
Languages: CSS, HTML, Javascript, Node.js

Technologies: React, Express.js, SQLite, Netlify, Git, ChatGPT

## Features
### Minimum Viable Product
- User Login System - Patients will be able to create accounts that allow them to log their previous entries with the chatbot and monitor their health statistics. Each patient will have their own user account, while an admin account will be available for medical staff to access and review all patient data.
- Account management - The account management feature will enable users to update their account details as needed.
- Website pages - The platform will include placeholder pages for the various features that are planned for future implementation, including:
    - An AI chatbot
    - A medical staff chat page
    - A VR/AR experience
    - A patient health stats data entry form
    - An account management page
    - A resource library that links to helpful websites and other resources
- Notification and alerting system - Patients will receive alerts from medical staff regarding important updates, as well as general website notifications.
- ChatGPT integration - The platform will integrate with ChatGPT, allowing users to ask questions and receive AI-generated responses. Initial efforts will focus on prompt engineering to ensure accurate, relevant, and empathetic responses. 
    - Step 2: Train the AI chatbot on our own data to improve the accuracy of responses. Collect information from reliable APIs and 
    utilize a webscraper to pull from renowned research articles. 
    - Step 3: Implement symptom image analysis, allowing patients to take pictures of physical symptoms for AI-based analysis, which will help determine the best course of action.

### Stretch Goals
- Develop a forum where patients can ask and answer questions.
- Build out the resource library to include more links and helpful information.
- Port the application to mobile platforms (Android/iPhone).
- Create games designed to help reduce patient stress.
- Implement live chat functionality between patients and medical staff.
- Develop a VR/AR avatar to provide a calming, virtual presence in place of a healthcare professional.

## Target Audience
The platform is designed with both patients and medical staff in mind. For patients, the focus is on improving their overall experience by providing access to features like symptom tracking, personalized AI support, and stress-relief tools. These resources aim to empower patients by giving them a sense of control over their treatment journey and making it easier to manage their day-to-day health. On the other side, medical staff will benefit from tools that help them monitor patient health data more efficiently. They’ll be able to track symptoms and progress in real time, send updates or reminders, and communicate directly with patients through the platform. This two-way system helps streamline care, making it easier for medical professionals to stay connected with their patients while ensuring patients feel supported throughout their treatment.

## Design
[ChemoCompaion Wireframe.pdf](https://github.com/user-attachments/files/17047966/ChemoCompaion.Wireframe.pdf)


## User Guide
- '''npm install''' within "...\chemo-companion"

### Backend
- '''npm install''' and '''npm install cors'' within "...\chemo-companion\backend\chatgpt-integration"
- Must have .env file within within "...\chemo-companion\backend\chatgpt-integration" OPENAI_API_KEY = "your api key here"

### Frontend
- cd frontend
- '''npm install''' to install dependencies
- Run '''npm start''' to start the app in development mode. Visit http://localhost:3000 to view the app.
- For production, use '''npm run build''' to create a production build in the build folder.
- Run '''npm test''' to launch the test runner in the interactive watch mode.\