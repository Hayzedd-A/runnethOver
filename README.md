# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


scaffold a project for a product affiliate website
pages = {
    public: [homepage, faqs, how it works, our story],
    auth: [signup, login],
    main app(protected): [search/result, saved items, account, profile, ]
}

description = {
    homepage: {
        components: [nav, banner, button(join the waitlist)]
    },
    faqs: {
        components: [nav, title, searchbar, list of faqs, button(join the waitlist)]
        features: {
            searchbar: to search the faqs
        }
    },
    how it works: {
        components: [nav, title, grid cards * 3, button(join the waitlist)]
    },
    our story: {
        components: [nav, title, story, button(join the waitlist)]
    },
    signup: {
        components: [signup form(on the left), full image(on the right)]
    },
    login: {
        components: [login form(on the left), full image(on the right)]
    },
    search: {
        components: [sidebar, appNav, main]
        features: {
            the main component contains a title and a wide image upload section which supports image drop or click to upload,
            a cancel and submit button at the right buttom.
            it submits the image to the backend, and gets a list of products as a result.
            the main component show the grid of products cards.
            the product card contains image, product name, brand, price, favourite icon button and a plus icon button, 
        }
    },
    saved ites: {
        excatly the same as the search result page.
    },
    account: {
        components [sidebar, appNav, main],
        features: {
            the main component contains a form to update firstname, lastname, gender, readonly field for email and an upload profile image
        }
    },
    profile: {
        components: [sidebar, appNav, main]
        features: {
            the main components contains the user profile image and the name at the middle of the left section and the profile information on the right side.
        }
    }
}
components: {
    side bar: {
        the app name as a logo
        contains three links to the other pages (search, wishlist, account)
        the sidebar is at the bottom of the page in mobile view
    }
    appNav: {
        the searchbar on the left,
        notification icon with badge, profile icon with the name, all on the right
    }
    nav: {
        the app name as a logo in the left, the links to other pages on the right
    }   
}
note: the appNav in the app is different from the nav in the public pages


study this whole project, the backend is ready.
modify this to work with the backend running on `localhost:5000`

API Endpoints
POST /api/auth/signup - User registration
POST /api/auth/login - User login
GET /api/auth/google - Google OAuth
POST /api/products/upload-image - Upload image for search
GET /api/products?query= - Manual product search
POST /api/favorites - Add to favorites
GET /api/favorites - Get favorites
DELETE /api/favorites/:id - Remove favorite
PUT /api/profile - Update user profile
POST /api/profile/image - Upload profile image (multipart/form-data)
GET /uploads/profiles/:filename