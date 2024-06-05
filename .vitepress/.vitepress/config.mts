import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "QLArk",
  description: "QLArk - it's a simple API generator from QLore code.",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/start' }
    ],

    sidebar: [
      { text: 'Start', link: '/start' },
      {
        text: 'Installation', link: "/installation",
        items: [
          { text: 'Window', link: "/installation#window" },
          { text: 'Linux', link: "/installation#linux" },
          { text: 'MacOS', link: "/installation#macos" }
        ]
      },
      {
        text: 'Configuration', link: "/configuration",
        items: [
          { text: "Init", link: "/configuration#init" },
          { text: "Architecture|Tags", link: "/configuration#qlark" }
        ]
      },
      {
        text: "QLore", link: "/qlore",
        items: [
          { text: "Emmit", link: "/qlore#emmit" },
          { text: "Comments", link: "/qlore#comments" },
          { text: "Arguments", link: "/qlore#arguments" }
        ]
      },
      {
        text: "Languages", link: "/languages",
        items: [
          { text: "Browser JavaScript", link: "/languages#js" },
          { text: "NodeJS CommonJS", link: "/languages#cjs" },
          { text: "NodeJS ESM", link: "/languages#mjs" },
          { text: "Python", link: "/languages#py" },
          { text: "TypeScript", link: "/languages#ts" },
          { text: "CSharp", link: "/languages#cs" },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Pinbib/QLArk' }
    ]
  }
})
