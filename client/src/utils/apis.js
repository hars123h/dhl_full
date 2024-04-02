import axios from "axios";
import BASE_URL from "../api_url";
axios.defaults.baseURL = BASE_URL;

const DateDifference = (date1, date2) => {

    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

    return Difference_In_Days;
}

const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export const getuserearn = async () => {

    var plans_purchased = []
    var earn = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0)

    await axios.post(`/get_user`, { user_id: localStorage.getItem('uid') }).then(async (responce) => {
        plans_purchased = responce.data.plans_purchased;

        plans_purchased = plans_purchased.map((plans, index) => {

            const fullTime = new Date(plans.fullTime).toDateString();
            const date_till_rewarded = new Date(plans.date_till_rewarded).toDateString();

            if (today < new Date(fullTime)) {

                if (plans.plan_cycle === 35 && today > new Date(date_till_rewarded)) {
                    earn += plans.plan_daily_earning
                }

                return {
                    ...plans, date_till_rewarded: today.toDateString()
                }
            }

            if (today > new Date(fullTime)) {
                return { ...plans }
            }

            if (DateDifference(today, new Date(fullTime)) === 0 && today > new Date(date_till_rewarded)) {

                if (plans.plan_cycle === 35) {
                    earn += plans.plan_daily_earning
                }
                else {
                    earn += plans.plan_daily_earning * plans.plan_cycle * plans.quantity;
                }

                return {
                    ...plans,
                    date_till_rewarded: today.toDateString()
                }
            }

            return {
                ...plans,
                date_till_rewarded: today.toDateString()
            }

        })
        await axios.post(`/update_earning`, {
            earn: earn,
            temp: plans_purchased,
            user_id: localStorage.getItem('uid')
        })
            .then(() => console.log('Reward successfully updated'))
            .catch(error => console.log('Some error Occured'));
    }).catch(error => {
        console.log('data not find');
    });


};