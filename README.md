# 📘 MINDLOG

**MINDLOG** is a private, personal diary and self-growth web application designed for clarity, discipline, and long-term personal development. It is built to be a "quiet place to think and grow," emphasizing mental safety over productivity pressure.

---

## 🌟 Core Philosophy
- **Zero Pressure:** No harsh language like "failed" or "missed." Language is kind and supportive.
- **Supportive Consistency:** Users can skip days without punishment; the app encourages the habit rather than forcing it.
- **Privacy-First:** Data belongs strictly to the user. No public feeds, no likes, no comments.
- **Mental Clarity:** Designed to reduce overthinking and provide life-level clarity through structured reflection.

---

## 🛠 Features

### 1. Multi-Level Reflection
- **Daily Diary:** Capture immediate thoughts, learnings, and small wins. Includes a mood scale (1–10).
- **Weekly Review:** Connect daily actions with direction. Includes self-ratings on effort and mindset.
- **Monthly Review:** Track growth trends, focus areas, and set non-negotiable habits for the coming month.
- **Yearly Reflection:** Provide life-level clarity by reviewing patterns, achievements, and intentions for the future.

### 2. Timeline & History
- View your journey through a searchable and filterable history.
- Edit past entries to add new insights or correct thoughts.
- Visual indicators for different entry types.

### 3. Meaningful Analytics
- **Streak Logic:** Increases with any daily entry. Resets silently without negative reinforcement.
- **Mood Trends:** 14-day mood visualization to track emotional well-being.
- **Consistency Tracking:** View entry distribution across all reflection types.

### 4. Privacy & Personalization
- **Dark Mode:** Calm visual themes for night-time reflection.
- **Local Persistence:** Data is stored directly in your browser's local storage—never sent to a server.
- **Data Portability:** Export your entire workspace as a JSON file for backup or personal records.
- **No Accounts Required:** No email, no login, no tracking.
- **Offline-First:** The app works fully without an internet connection.
- **No Telemetry:** No analytics, no usage tracking, no third-party scripts.

---
## 🚫 What MindLog Is Not
- Not a social network
- Not a habit punishment system
- Not a goal leaderboard
- Not an AI that tells you what to do

---
- **AI (Optional, Local-First):** Future AI reflections will run through a privacy-safe prompt layer with user control.

---


## 🏗 Architecture (MVC Overview)

The application follows a clean, modular structure:

### **Model (State & Types)**
- `types.ts`: Defines the core data structures (`Entry`, `AppState`, `UserStats`).
- `services/storage.ts`: Handles data persistence logic and streak calculations.

### **View (Components & Pages)**
- `views/`: Contains the primary screens (Home, Editor, History, Analytics, Settings).
- `components/`: Reusable UI elements like `Layout` and `MoodSelector`.
- `constants.tsx`: Houses the structured question sets and configuration for each reflection type.

### **Controller (App Logic)**
- `App.tsx`: Acts as the main orchestrator, managing state transitions, navigation, and coordinating between storage services and views.

---

## 🚀 Technical Stack
- **Frontend:** React (ES6+ Modules)
- **Styling:** Tailwind CSS (Modern, utility-first UI)
- **Icons:** Lucide-React (Clean, minimal iconography)
- **Charts:** Recharts (Simple, meaningful data visualization)
- **State Management:** React Hooks (useState, useEffect)
- **Persistence:** LocalStorage API

---

## 📝 Usage Guide
1. **Dashboard:** See your current streak and quickly jump into a daily reflection.
2. **Writing:** Select "Write" from the navigation to choose between Daily, Weekly, Monthly, or Yearly formats.
3. **Saving:** Entries auto-save locally to prevent data loss.
4. **Analysis:** Check the "Stats" tab to see your progress and mood trends.
5. **Security:** Use the Settings tab to toggle Dark Mode or clear your local database if needed.

---

> *"This is not a productivity trap. This is a notebook for your mind."*