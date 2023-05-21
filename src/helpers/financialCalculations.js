import TaxBrackets from '@/assets/taxbrackets.json'
import CoL from '@/assets/CoL.json'
import CityToState from '@/assets/CityToState.json'

export const getMonthlyCostOfLiving = (userData) => {
    return getRent(userData) + getUtility(userData) + getFood(userData)
}

const getRent = (userData) => {
    return CoL["Rent"][userData.location['city']]
}

const getUtility = (userData) => {
    return CoL["Utility"][userData.location['city']]
}

const getFood = (userData) => {
    return CoL["Food"][userData.location['city']]
}

