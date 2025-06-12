# CuanQ - Personal Finance Management Application

CuanQ is a modern personal finance management application built with React that helps users track their expenses, manage their budget, and get insights into their financial habits.

## Features

- 📊 Interactive Dashboard with Income & Expense Charts
- 💰 Real-time Wallet Balance Tracking
- 📝 Transaction Management
- 📈 Future Financial Predictions
- 📱 Responsive Design
- 🔐 Secure Authentication

## Tech Stack

- React.js
- React Router for navigation
- Chart.js for data visualization
- Axios for API requests
- Bootstrap for styling
- Inter font for modern typography

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cuanq.git
cd cuanq
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
REACT_APP_API_BASE_URL=your_api_base_url
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── assets/          # Static assets like images
├── components/      # Reusable components
├── context/         # React context files
├── layouts/         # Layout components
├── pages/          # Page components
├── routes/         # Route configurations
├── services/       # API services
└── styles/         # CSS styles
```

## Key Components

- **Dashboard**: Main overview of financial status
- **AddTransaction**: Form to add new transactions
- **TransactionHistory**: List of all transactions
- **FuturePrediction**: AI-powered financial predictions
- **IncomeExpenseChart**: Visual representation of income and expenses
- **SpendingPieChart**: Breakdown of spending by category

## Styling

The application uses:
- Bootstrap for responsive layout
- Custom CSS for specific styling
- Inter font family for modern typography
- Custom color scheme with purple as primary color

## Number Formatting

The application uses Indonesian number formatting:
- Thousand separators using dots (.)
- Example: 1.000.000
- Currency prefix: "Rp"

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React.js team for the amazing framework
- Chart.js for the visualization library
- Bootstrap team for the UI framework
- Google Fonts for the Inter font family 