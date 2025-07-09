# Link Vibe - Your Personal Linktree 🚀

![Project Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
[![Deploy with Vercel](https://vercel.com/button?style=for-the-badge)](https://demo.vercel.app)
![Tech Stack](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

This is **Day 1** of my **#30DaysOfVibeCoding** challenge!

Link Vibe is a beautiful, customizable link-in-bio page. It's a full-stack CRUD (Create, Read, Update, Delete) application that allows users to sign up, manage their own social links, and share them on a clean, public profile page.

### ✨ [Live Demo](https://demo.vercel.app) ✨

 ![GradientFlow Screenshot](./public/Screenshot%202025-07-10%20002807.png)
 ![GradientFlow Screenshot](./public/Screenshot%202025-07-10%20002904.png)

## 📋 Features

*   **User Authentication:** Secure user sign-up and login using email/password via Supabase Auth.
*   **Protected Dashboard:** A private, members-only dashboard to manage links.
*   **Full CRUD for Links:** Users can Create, Read, and Delete their own links.
*   **Profile Management:** Users can set a unique public username for their page.
*   **Dynamic Public Pages:** Each user gets a public page at `your-app.com/[username]` to display their links.
*   **Responsive Design:** A beautiful and functional UI on all devices, built with Tailwind CSS.


## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Backend & Database:** [Supabase](https://supabase.io/) (PostgreSQL, Auth, Storage)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn
*   A free [Supabase](https://supabase.com) account

### Installation

1.  **Fork the repository**
    Click the "Fork" button at the top right of this page.

2.  **Clone your forked repository**
    ```sh
    git clone https://github.com/shvbhii/link-vibe.git
    ```

3.  **Navigate to the project directory**
    ```sh
    cd link-vibe
    ```

4.  **Install NPM packages**
    ```sh
    npm install
    ```

5.  **Set up your Supabase project**
    *   Go to [Supabase](https://supabase.com) and create a new project.
    *   Go to the **SQL Editor** and paste the contents of the `schema.sql` script I used (or run the script from the tutorial) to create the `profiles` and `links` tables.
    *   In your Supabase project, go to **Project Settings > API**.

6.  **Create your environment file**
    *   Create a file named `.env.local` in the root of your project.
    *   Copy your API keys from Supabase into it:
      ```
      NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
      NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
      ```

7.  **Run the development server**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing & Issues

This was a personal challenge project, but contributions, issues, and feature requests are welcome!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

If you find a bug or have a suggestion, please [create an issue](https://github.com/YOUR_GITHUB_USERNAME/link-vibe/issues).

## 💬 Connect with Me

<a href="https://www.linkedin.com/in/shvbhi" target="_blank">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
</a>

Let's connect! I'd love to hear your feedback or just say hi.