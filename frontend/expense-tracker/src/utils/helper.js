import moment from "moment"

export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
}

export const getInitials = (name) => {
    if(!name) return ""

    const words = name.split(" ")
    let initials = ""

    for(let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0]
    }

    return initials.toUpperCase()
}

export const addThounsandSeparators = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");

    let lastThree = integerPart.slice(-3);
    let otherNumbers = integerPart.slice(0, -3);

    if (otherNumbers !== "") {
        otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        return fractionalPart
            ? `${otherNumbers},${lastThree}.${fractionalPart}`
            : `${otherNumbers},${lastThree}`;
    }

    return fractionalPart ? `${lastThree}.${fractionalPart}` : lastThree;
}

export const prepareExpenseBarChartData = (data = []) => {
    const storedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))
    const chartData = storedData.map((item) => ({
        category: item ?.category,
        month: moment(item ?.date).format("Do MMM"),
        amount: item ?.amount,
    }))

    return chartData
}

export const prepareIncomeBarChartData = (data = []) => {
    const storedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))
    const chartData = storedData.map((item) => ({
        category: item ?.source,
        month: moment(item ?.date).format("Do MMM"),
        amount: item ?.amount,
        source: item ?.source,
    }))

    return chartData
}

export const prepareExpenseLineChartData = (data = []) => {
    const grouped = {}

    data.forEach(item => {
        const key = moment(item.date).format("YYYY-MM-DD")   // consistent date key

        if (!grouped[key]) {
            grouped[key] = {
                date: key,
                amount: Number(item.amount) || 0
            }
        } else {
            grouped[key].amount += Number(item.amount) || 0
        }
    })

    const chartData = Object.values(grouped)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(item => ({
            month: moment(item.date).format("Do MMM"),
            amount: item.amount
        }))

    return chartData
}