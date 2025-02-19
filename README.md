# Taste of Africa

An e-commerce platform for African cuisine delivery, built with Next.js 13, TypeScript, and Tailwind CSS.

## Features Implemented

### Authentication
- User registration and login system
- Protected routes for authenticated users
- Profile management with user details

### Shopping Experience
- Product catalog with categories
- Shopping cart functionality
  - Add/remove items
  - Adjust quantities
  - Cart persistence
- Wishlist feature
  - Add/remove products
  - Wishlist persistence

### Checkout Process
- Multi-step checkout flow:
  1. Account verification (Guest/Auth)
  2. Shipping & Personal details
  3. Payment method selection
  4. Order review and confirmation
- Payment method management
  - Save and manage cards for authenticated users
  - Guest checkout support
- Order confirmation/cancellation with modal dialogs

### User Profile
- Personal information management
- Address management
- Saved payment methods
- Order history
  - Visual order status tracking
  - Detailed order information
  - Order items preview with images
  - Status-based styling (e.g., greyed-out cancelled orders)

### UI/UX Improvements
- Responsive design for all screen sizes
- Loading states and animations
- Error handling and user feedback
- Clean and intuitive navigation
- Modern design with Tailwind CSS
- Framer Motion animations for smooth transitions

### State Management
- Context-based state management for:
  - Authentication
  - Shopping Cart
  - Wishlist
  - Orders
- Local storage persistence for user data

## Technical Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Local Storage for data persistence

## Next Steps

1. **Backend Integration**
   - Implement a proper backend service
   - Set up a database for persistent storage
   - Add API routes for data handling

2. **Payment Processing**
   - Integrate with Stripe or similar payment processor
   - Implement secure payment handling
   - Add payment verification

3. **Authentication Enhancement**
   - Implement OAuth providers (Google, Facebook, etc.)
   - Add email verification
   - Implement password reset functionality

4. **Product Management**
   - Add admin dashboard
   - Implement product inventory management
   - Add product categories management

5. **Order Management**
   - Add order tracking system
   - Implement order status updates
   - Add email notifications for order updates

6. **Search and Filtering**
   - Implement product search functionality
   - Add advanced filtering options
   - Add sorting capabilities

7. **Performance Optimization**
   - Implement image optimization
   - Add caching strategies
   - Optimize bundle size

8. **Testing**
   - Add unit tests
   - Implement integration tests
   - Add end-to-end testing

9. **Deployment**
   - Set up CI/CD pipeline
   - Configure production environment
   - Implement monitoring and logging

## Getting Started



First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



This README now reflects all my recent changes and provides a clear roadmap for future development. The next major step would be implementing a proper backend service and database to replace our current local storage solution.