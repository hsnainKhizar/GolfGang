import database from '@react-native-firebase/database'
import moment from 'moment'

export const SendMessage = async (currentUid, guestUid, message,imgSource) => {

    let todayDate = moment() 
   
    try {
        return await
        database()
            .ref("message/" + currentUid).
            child(`${guestUid}`)
            .push({
                messege: {
                    sender: currentUid,
                    reciever: guestUid,
                    msg: message,
                    image:imgSource,
                    date:todayDate.format('YYYY-MM-DD'),
                    time:todayDate.format('hh:mm A')
                },
            })
    } catch (error) {
        return error
    }
    ////second node 
}



export const RecieveMessage = async (currentUid, guestUid, message,imgSource) => {
    try {
        let todayDate = moment() 
        database()
            .ref("message/" + guestUid).
            child(`${currentUid}`)
            .push({
                messege: {
                    sender: currentUid,
                    reciever: guestUid,
                    msg: message,
                    image:imgSource,
                    date:todayDate.format('YYYY-MM-DD'),
                    time:todayDate.format('hh:mm A')
                },
            })
    } catch (error) {
        return error
    }
}

// export const setLastMessage = async (currentUid, guestUid, message,imgSource) => {
//     try {
//         return await
//         database()
//             .ref("lastmessage/" + currentUid).
//             child(`${guestUid}`)
//             .set({
//                 messege: {
//                     sender: currentUid,
//                     reciever: guestUid,
//                     msg: message,
//                     image:imgSource,
//                     date:todayDate.format('YYYY-MM-DD'),
//                     time:todayDate.format('hh:mm A')
//                 },
//             })
//     } catch (error) {
//         return error
//     }
// }