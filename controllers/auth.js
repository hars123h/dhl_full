const User = require("../model/user");
const referralCodeGenerator = require("referral-code-generator");
const axios = require("axios");
const Plan = require("../model/plan");
const Bank = require("../model/bank");
const Recharge = require("../model/recharge");
const Feedback = require("../model/feedback");
const Withdrawal = require("../model/withdrawal");
const Amount = require("../model/amount");
const Controller = require("../model/controller");
const Blocked = require("../model/blocked");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
  console.log(err.stack, "line 16");
});

exports.login = async (req, res) => {
  const { mobno, pwd, reward, rewardLink } = req.body;
  var amount, message;
  if (!mobno || !pwd) {
    res.status(400).json({
      message: "Username or Password not present",
    });
  } else {
    try {
      const data = await User.findOne({ mobno: mobno, pwd: pwd }).then(
        async (response) => {
          if (reward && rewardLink) {
            const promocode = await Amount.findById(
              "656b2cf62f2175f4a8fbbceb"
            ).then((response2) => response2.promo_code);

            const code2 = promocode.filter((e) => e.rewardCode === rewardLink);

            if (!code2) {
              message = "Invalid reward link";
            } else if (code2[0].noOfReward <= code2[0].reward_given) {
              message = "Link Expired";
            } else if (response.invite_reward1.includes(rewardLink)) {
              message = "Link Expired";
            } else {
              const decipher = (salt) => {
                const textToChars = (text) =>
                  text.split("").map((c) => c.charCodeAt(0));
                const applySaltToChar = (code) =>
                  textToChars(salt).reduce((a, b) => a ^ b, code);
                return (encoded) =>
                  encoded
                    .match(/.{1,2}/g)
                    .map((hex) => parseInt(hex, 32))
                    .map(applySaltToChar)
                    .map((charCode) => String.fromCharCode(charCode))
                    .join("");
              };

              const myDecipher = decipher("mySecretSalt");

              const code = myDecipher(reward);

              const rewardAmount = Number(code);

              console.log("run", code);
              if (isNaN(rewardAmount)) {
                message = "invalid reward link";
              } else {
                await User.findOneAndUpdate(
                  { mobno: mobno, pwd: pwd },
                  {
                    $inc: { balance: rewardAmount },
                    // $set: { invite_reward1: new Date() },
                    $addToSet: {
                      invite_reward1: rewardLink,
                    },
                  }
                )
                  .then(() => {
                    console.log("reward recived", rewardAmount);
                    message = "success";
                    amount = rewardAmount;
                  })
                  .catch((error) => console.log(error));

                await Amount.findByIdAndUpdate(
                  "656b2cf62f2175f4a8fbbceb",
                  {
                    $set: {
                      "promo_code.$[x]": {
                        ...code2[0],
                        reward_given: code2[0].reward_given + 1,
                      },
                    },
                  },
                  {
                    arrayFilters: [{ "x.rewardCode": rewardLink }],
                  }
                );
              }
            }
          }

          return response;
        }
      );

      // if (data) {
      res.status(200).json({
        message: "Logged In Successfully",
        user_details: data,
        reward: { amount, message },
      });
      // }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Something went wrong",
        error: error,
      });
    }
  }
};

exports.getOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const activationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const token = jwt.sign(
      {
        phoneNumber,
        activationCode,
      },
      "pikasjdfgfweajkhawejfhjlasdkhfojawehsrfjlohweraljrhknfaejlowhrjlkwaehfrl",
      {
        expiresIn: "2m",
      }
    );

    const sendOtp = await axios.get(
      `https://www.fast2sms.com/dev/bulkV2?authorization=U1dPqEDiCO5WfZMAFwovrmz349tKBL0Hbh2eGlN8QXg7ujSRYVTSyRuW9H3LZ2Nafn5X6obgd47ACIt0&variables_values=${activationCode}&route=otp&numbers=${phoneNumber}`
    );
    // console.log("Activation code", activationCode);
    res.status(201).json({
      msg: "Otp Send",
      activationToken: token,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { otp, token } = req.body;
    if (!otp || !token) {
      return res.status(400).json({
        msg: "Otp or Token is null",
      });
    }

    const data = this.verifyOtpFunction(token, otp);
    const { result } = data;
    console.log("Data", data);

    if (result === "Jwt Expired") {
      return res.status(400).json({
        msg: "Otp Expired!",
      });
    }

    if (result === "Fail to Verify Otp") {
      return res.status(400).json({
        msg: "Something Went Wrong",
      });
    }
    if (result === "Invalid Otp") {
      return res.status(400).json({
        msg: "Invalid Otp",
      });
    }

    if (result === "Otp Verified") {
      return res.status(200).json({
        msg: "Otp Verified",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrongfdgsgfdsg",
    });
  }
};

exports.verifyOtpFunction = (token, otp) => {
  let result;
  const newUser = jwt.verify(
    token,
    "pikasjdfgfweajkhawejfhjlasdkhfojawehsrfjlohweraljrhknfaejlowhrjlkwaehfrl",
    function (err, decode) {
      if (err) {
        if (err == "TokenExpiredError" || "jwt expired") {
          result = "Jwt Expired";
        } else {
          result = "Fail to Verify Otp";
        }
      } else if (decode) {
        // console.log("new User", decode);
        if (decode.activationCode !== otp) {
          result = "Invalid Otp";
        } else if (decode.activationCode === otp) {
          result = "Otp Verified";
        }
      }
    }
  );

  return { result };
};

exports.register = async (req, res) => {
  const { mobno, pwd, wpwd, invt, name, email, token, otp } = req.body;
  const prarent = await User.findOne({ user_invite: invt });
  if (!prarent) {
    console.log("run");
    return res.status(200).json({ message: "invalid invite code" });
  }

  const data = this.verifyOtpFunction(token, otp);
  const { result } = data;
  console.log("Data", data);

  if (result === "Jwt Expired") {
    return res.status(400).json({
      message: "Otp Expired!",
    });
  }

  if (result === "Fail to Verify Otp") {
    return res.status(400).json({
      message: "Something Went Wrong",
    });
  }
  if (result === "Invalid Otp") {
    return res.status(400).json({
      message: "Invalid Otp",
    });
  }

  if (result === "Otp Verified") {



    await User.findOne({ mobno: mobno }).then(async (responses) => {
      if (responses) {
        return res
          .status(200)
          .json({ message: "Mobile Number already registered!" });
      } else {
        if (pwd.length < 6) {
          return res
            .status(400)
            .json({ message: "Password less than 6 characters" });
        }
        try {
          const date = new Date();

          date.setDate(date.getDate() - 1);

          await User.create({
            mobno,
            pwd,
            wpwd,
            name,
            email,
            time: new Date(),
            balance: 50,
            recharge_amount: 0,
            withdrawal_sum: 0,
            earning: 0,
            user_invite: referralCodeGenerator.alpha("lowercase", 6),
            parent_invt: invt,
            grand_parent_invt: "",
            directRecharge: 0,
            indirectRecharge: 0,
            directMember: [],
            indirectMember: [],
            boughtLong: 0,
            showShort: 0,
            boughtShort: 0,
            lastWithdrawal: date,
            bank_details: new Bank(),
            rewards: 50,
          })
            .then(async (user) => {
              const parent_data = await User.findOne({
                user_invite: user.parent_invt,
              }).then((res) => res);
              // if (!parent_data) {
              //   return res.status(400).json({ message: "invalid invite code" })
              // }
              return { user, parent_data };
            })
            .then(async ({ user, parent_data }) => {
              const grand_parent_data = await User.findOne({
                user_invite: parent_data.parent_invt,
              }).then((res) => res);
              return { user, parent_data, grand_parent_data };
            })
            .then(async ({ user, parent_data, grand_parent_data }) => {
              const great_grand_parent_data = await User.findOne({
                user_invite: grand_parent_data.parent_invt,
              }).then((res) => res);
              return {
                user,
                parent_data,
                grand_parent_data,
                great_grand_parent_data,
              };
            })
            .then(
              async ({
                user,
                parent_data,
                grand_parent_data,
                great_grand_parent_data,
              }) => {
                const newUser = await User.updateOne(
                  { _id: user._id },
                  {
                    $set: {
                      parent_id: parent_data._id,
                      grand_parent_id: grand_parent_data._id,
                      great_grand_parent_id: great_grand_parent_data._id,
                    },
                  }
                );

                await User.updateOne(
                  { _id: parent_data._id },
                  { $push: { directMember: user._id } }
                );

                await User.updateOne(
                  { _id: grand_parent_data._id },
                  { $push: { indirectMember: user._id } }
                );

                await User.updateOne(
                  { _id: great_grand_parent_data._id },
                  { $push: { in_indirectMember: user._id } }
                );

                return user._id;
              }
            )
            .then((user_id) =>
              res.status(200).json({
                message: "User successfully created",
                user_id: user_id,
              })
            );
        } catch (err) {
          console.log(err);
          res.status(401).json({
            message: "User not successful created",
            error: err,
          });
        }
      }
    });
  }
};

exports.get_blocked_users = async (req, res) => {
  try {
    await Blocked.find({}).then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { mobno, new_pwd, token, otp } = req.body;
  try {

    const data = this.verifyOtpFunction(token, otp);
    const { result } = data;
    console.log("Data", data);

    if (result === "Jwt Expired") {
      return res.status(400).json({
        message: "Otp Expired!",
      });
    }

    if (result === "Fail to Verify Otp") {
      return res.status(400).json({
        message: "Something Went Wrong",
      });
    }
    if (result === "Invalid Otp") {
      return res.status(400).json({
        message: "Invalid Otp",
      });
    }

    if (result === "Otp Verified") {
      await User.updateOne(
        { mobno },
        {
          $set: {
            pwd: new_pwd,
          },
        }
      );
      res.status(200).json({
        message: "Password Successfully Changed",
      });
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error,
    });
  }
};

exports.purchase = async (req, res) => {
  const {
    investAmount,
    boughtLong,
    boughtShort,
    plans_purchased,
    user_id,
    recharge_amount,
    wallet,
    balance,
  } = req.body;
  const newPlan = plans_purchased;
  var vipValue;

  const user_data = await User.findById(user_id).then((response) => response);

  var investment = plans_purchased.plan_amount;
  user_data?.plans_purchased.forEach((data) => {
    investment += data.plan_amount;
  });

  // console.log(investment);

  // if (investment === 0) {
  //   vipValue = 0
  // }
  // if (investment >= 495) {
  //   vipValue = 1
  // }
  // if (investment >= 10000) {
  //   vipValue = 2
  // }
  // if (investment >= 30000) {
  //   vipValue = 3
  // }
  // if (investment >= 70000) {
  //   vipValue = 4
  // }
  // if (investment >= 200000) {
  //   vipValue = 5
  // }
  // if (investment >= 500000) {
  //   vipValue = 6
  // }
  // if (investment >= 1000000) {
  //   vipValue = 7
  // }
  // if (investment >= 5000000) {
  //   vipValue = 8
  // }

  // console.log(typeof balance);

  if (wallet === "recharge") {
    try {
      await User.updateOne(
        { _id: user_id },
        {
          $set: {
            // balance: balance,
            // vipLevel: vipValue,
            totalInvestment: investment,

            recharge_amount: recharge_amount,
          },
          $inc: {
            boughtLong: boughtLong,
            boughtShort: boughtShort,
          },
          $push: {
            plans_purchased: newPlan,
          },
        }
      );
      res.status(200).json({
        message: "Plan Purchased Successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Something went wrong",
      });
    }

    const commissionData = {
      investAmount,
      date: plans_purchased.date_purchased,
      time: plans_purchased.time,
    };

    // Level 1 recharge commission
    await User.updateOne(
      { _id: user_data.parent_id },
      {
        $inc: {
          balance: Number((10 / 100) * Number(investAmount)),
          directRecharge: Number((10 / 100) * Number(investAmount)),
        },
        $addToSet: {
          // directMember: data.user_id,
          comissionData: {
            ...commissionData,
            comissionAmount: Number((investAmount * 10) / 100),
            commissionLevel: "Level 1",
          },
        },
      }
    );
    // Level 2 recharge commission
    await User.updateOne(
      { _id: user_data.grand_parent_id },
      {
        $inc: {
          balance: Number((7 / 100) * Number(investAmount)),
          indirectRecharge: Number((7 / 100) * Number(investAmount)),
        },
        $addToSet: {
          // indirectMember: data.user_id,
          comissionData: {
            ...commissionData,
            comissionAmount: Number((investAmount * 7) / 100),
            commissionLevel: "Level 2",
          },
        },
      }
    );
    // Level 3 recharge commission
    await User.updateOne(
      { _id: user_data.great_grand_parent_id },
      {
        $inc: {
          balance: Number((3 / 100) * Number(investAmount)),
          in_indirectRecharge: Number((3 / 100) * Number(investAmount)),
        },
        $addToSet: {
          // in_indirectMember: data.user_id,
          comissionData: {
            ...commissionData,
            comissionAmount: Number((investAmount * 3) / 100),
            commissionLevel: "Level 3",
          },
        },
      }
    );
  }

  if (wallet === "balance") {
    try {
      await User.updateOne(
        { _id: user_id },
        {
          $set: {
            balance: balance,
            // vipLevel: vipValue,
            totalInvestment: investment,

            // recharge_amount: recharge_amount,
          },
          $inc: {
            boughtLong: boughtLong,
            boughtShort: boughtShort,
          },
          $push: {
            plans_purchased: newPlan,
          },
        }
      );
      res.status(200).json({
        message: "Plan Purchased Successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Something went wrong",
      });
    }
  }
};

exports.reset_login_password = async (req, res) => {
  const { user_id, new_pwd } = req.body;

  // console.log(new_pwd);

  try {
    await User.updateOne(
      { _id: user_id },
      {
        $set: {
          pwd: new_pwd,
        },
      }
    );
    res.status(200).json({
      message: "Password Successfully Changed",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

exports.reset_withdrawal_password = async (req, res) => {
  const { user_id, new_wpwd } = req.body;
  try {
    await User.updateOne(
      { _id: user_id },
      {
        $set: {
          wpwd: new_wpwd,
        },
      }
    );
    res.status(200).json({
      message: "Withdrawal Password Successfully Changed",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

exports.bank_details = async (req, res) => {
  const { user_id, bank_details, token, otp } = req.body;
  try {
    const data = this.verifyOtpFunction(token, otp);
    const { result } = data;
    console.log("Data", data);

    if (result === "Jwt Expired") {
      return res.status(400).json({
        message: "Otp Expired!",
      });
    }

    if (result === "Fail to Verify Otp") {
      return res.status(400).json({
        message: "Something Went Wrong",
      });
    }
    if (result === "Invalid Otp") {
      return res.status(400).json({
        message: "Invalid Otp",
      });
    }

    if (result === "Otp Verified") {

      await User.updateOne(
        { _id: user_id },
        {
          $set: {
            bank_details: new Bank(bank_details),
          },
        }
      );
      res.status(200).json({
        message: "Bank Details Successfully updated",
      });
    }
  }
  catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    });
  }

};

exports.related_recharges = async (req, res, next) => {
  const related_recharge = await Recharge.find({ refno: req.body.refno });
  if (related_recharge.length > 0) {
    req.body.refnoexists = "yes";
  } else {
    req.body.refnoexists = "no";
  }
  next();
};

exports.place_recharge = async (req, res) => {
  const data = req.body;
  // console.log(req.body);

  if (req.body.refnoexists === "yes") {
    res.status(200).json({
      message: "refno already exists",
    });
  } else {
    try {
      await Recharge.create({ ...data, status: 'pending' }).then(async (recharge_data) => {
        await User.updateOne(
          { _id: data.user_id },
          {
            $push: {
              placed_recharges: {
                recharge_id: recharge_data._id,
                time: new Date(data.time),
              },
            },
          }
        );
      });
      res.status(200).json({
        message: "Recharge Placed Successfully",
      });
    } catch (error) {
      res.status(400).json({
        message: "Something went wrong",
      });
    }
  }
};

exports.feedback = async (req, res) => {
  const data = req.body;
  try {
    await Feedback.create(data).then((data) => {
      res.status(200).json({
        message: "Feedback Submitted Successfully",
        feedback: data,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.update_recharge = async (req, res) => {
  const data = req.body;
  // Add recharge bonus on line 271, sent amountDetails along with req.body
  try {
    await Recharge.updateOne(
      { _id: data.recharge_id },
      {
        $set: { status: data.new_status },
      }
    ).then(async () => {
      if (data.new_status === "confirmed") {
        await User.updateOne(
          { _id: data.user_id },
          {
            $inc: {
              recharge_amount: data.recharge_value,
              // balance: data.recharge_value
            },
          }
        );
        // Level 1 recharge commission
        // await User.updateOne({ _id: data.parent_id }, {
        //   $inc: {
        //     balance: Number((15 / 100) * (Number(data.recharge_value))),
        //     directRecharge: Number(data.recharge_value)
        //   },
        //   $addToSet: {
        //     directMember: data.user_id
        //   }
        // });
        // // Level 2 recharge commission
        // await User.updateOne({ _id: data.grand_parent_id }, {
        //   $inc: {
        //     balance: Number((3 / 100) * (Number(data.recharge_value))),
        //     indirectRecharge: Number(data.recharge_value)
        //   },
        //   $addToSet: {
        //     indirectMember: data.user_id
        //   }
        // });
        // // Level 3 recharge commission
        // await User.updateOne({ _id: data.great_grand_parent_id }, {
        //   $inc: {
        //     balance: Number((2 / 100) * (Number(data.recharge_value))),
        //     in_indirectRecharge: Number(data.recharge_value)
        //   },
        //   $addToSet: {
        //     in_indirectMember: data.user_id
        //   }
        // });
      }
    });

    res.status(200).json({
      message: "Status updated Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.place_withdrawal = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const { user_id } = req.body;
  const userData = await User.findById(user_id);
  const mylastWithdrawal = userData.lastWithdrawal;
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const isBetween = () => {
    var startTime = "10:00:00";
    var endTime = "17:00:00";

    var currentDate = new Date();

    console.log(currentDate.getHours());

    var startDate = new Date(currentDate.getTime());
    startDate.setHours(startTime.split(":")[0]);
    startDate.setMinutes(startTime.split(":")[1]);
    startDate.setSeconds(startTime.split(":")[2]);

    var endDate = new Date(currentDate.getTime());
    endDate.setHours(endTime.split(":")[0]);
    endDate.setMinutes(endTime.split(":")[1]);
    endDate.setSeconds(endTime.split(":")[2]);

    var valid = startDate < currentDate && endDate > currentDate;
    //console.log(valid);
    return valid;
  };

  // console.log(mylastWithdrawal.toDateString() === date.toDateString());

  // if (!userData.plans_purchased.some(obj => obj.plan_amount === 350)) {
  //   return res.status(400).json({
  //     message: 'buy 350 plan to withdraw'
  //   })
  // }

  // if (userData.plans_purchased.some(obj => obj.plan_amount > 500) && !userData.plans_purchased.some(obj => obj.plan_amount === 1100)) {
  //   return res.status(400).json({
  //     message: 'buy 1100 plan to withdraw'
  //   })
  // }

  // if (mylastWithdrawal.toDateString() === date.toDateString()) {
  //   return res.status(400).json({
  //     message: 'you can withdraw once in a day.'
  //   })
  // }

  // if (data.withdrawalAmount < 250) {
  //   return res.status(400).json({
  //     message: 'Amount Should be greater than 250.'
  //   })
  // }

  // else if (!isBetween()) {
  //   return res.status(400).json({
  //     message: 'You can withdraw only between 10am to 5pm'
  //   })
  // }

  try {
    Withdrawal.create(data)
      .then(async (response) => {
        await User.updateOne(
          { _id: data.user_id },
          {
            $push: {
              withdrawals: {
                withdrawals_id: response._id,
                time: response.time,
              },
            },
            $set: {
              balance: data.balance - data.withdrawalAmount,
              lastWithdrawal: data.time,
            },
            $inc: {
              withdrawal_sum: data.withdrawalAmount,
            },
          }
        );

        // console.log(response, 'withdrawl responce');
        res.status(200).json({
          message: "Withdrawal Request Placed Successfully",
          data,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          message: "Something went wrong!",
          error: error.message,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

exports.update_withdrawal = async (req, res) => {
  const data = req.body;

  try {
    await Withdrawal.updateOne(
      { _id: data.withdrawal_id },
      {
        $set: {
          status: data.new_status,
        },
      }
    ).then(async () => {
      if (data.new_status === "declined") {
        await User.updateOne(
          { _id: data.user_id },
          {
            $inc: {
              balance: Number(data.withdrawal_value),
              withdrawal_sum: -1 * Number(data.withdrawal_value),
            },
          }
        );
      }
    });
    const new_Data = await Withdrawal.find({});
    res.status(200).json({
      messaage: "Status Updated Successfully",
      new_Data,
    });
  } catch (error) {
    console.log(error, "withdrawl error");
    res.status(400).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

exports.get_all_recharges = async (req, res) => {
  try {
    const response = await Recharge.find({});
    res.status(200).json({
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.get_all_withdrawals = async (req, res) => {
  try {
    const response = await Withdrawal.find({});
    res.status(200).json({
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.getcustomewithdrawl = async (req, res) => {
  const { searchField } = req.body;
  try {
    await Withdrawal.find({
      phoneNo: { $regex: new RegExp(`^${searchField}`) },
    }).then((result) => {
      // console.log(result);
      // console.log(err);
      res.status(200).json({ data: result });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "something went wrong!",
    });
  }
};

exports.invite_rewards = async (req, res) => {
  const { user_id } = req.body;
  const user_data = await User.findById(user_id).then((response) => response);
  var temp_arr = [],
    rsum = 0;
  user_data.directMember.map(async (member_id) => {
    const recharge_value = await User.findById(member_id).then(
      ({ recharge_amount }) => recharge_amount
    );
    if (recharge_value >= 500) {
      rsum++;
      temp_arr.push(recharge_value);
    }
  });
  try {
    const direct_friends = temp_arr.length;

    if (
      direct_friends === 3 &&
      user_data.invite_reward1 === "NO" &&
      rsum >= 1500
    ) {
      await User.updateOne(
        { _id: user_id },
        {
          $set: {
            invite_reward1: "YES",
          },
          $inc: {
            balance: 300,
          },
        }
      );
    }

    if (
      direct_friends === 5 &&
      user_data.invite_reward2 === "NO" &&
      rsum >= 2500
    ) {
      await User.updateOne(
        { _id: user_id },
        {
          $set: {
            invite_reward2: "YES",
          },
          $inc: {
            balance: 500,
          },
        }
      );
    }

    if (
      direct_friends === 10 &&
      user_data.invite_reward3 === "NO" &&
      rsum >= 12000
    ) {
      await User.updateOne(
        { _id: user_id },
        {
          $set: {
            invite_reward3: "YES",
          },
          $inc: {
            balance: 1200,
          },
        }
      );
    }

    if (
      direct_friends === 30 &&
      user_data.invite_reward4 === "NO" &&
      rsum >= 105000
    ) {
      await User.updateOne(
        { _id: user_id },
        {
          $set: {
            invite_reward4: "YES",
          },
          $inc: {
            balance: 3500,
          },
        }
      );
    }

    if (
      direct_friends === 60 &&
      user_data.invite_reward5 === "NO" &&
      rsum >= 600000
    ) {
      await User.updateOne(
        { _id: user_id },
        {
          $set: {
            invite_reward5: "YES",
          },
          $inc: {
            balance: 10000,
          },
        }
      );
    }

    const update_user = await User.findById(user_id).then(
      (response) => response
    );

    res.status(200).json({
      message: "Updated Successfully",
      invite_prize1: update_user.invite_reward1,
      invite_prize2: update_user.invite_reward2,
      invite_prize3: update_user.invite_reward3,
      invite_prize4: update_user.invite_reward4,
      invite_prize5: update_user.invite_reward5,
      friend_length: temp_arr.length,
    });
  } catch (error) {
    res.status(400).json({
      messaage: "Something went wrong",
    });
  }
};

exports.lvl1 = async (req, res) => {
  const { user_id } = req.body;
  try {
    await User.findById(user_id)
      .then((user_data) => {
        const level_1 = async () => {
          arr1 = await User.find({
            _id: { $in: user_data.directMember },
          }).clone();
          res.status(200).json({ level1: arr1 });
        };
        level_1();
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

exports.lvl2 = async (req, res) => {
  const { user_id } = req.body;
  try {
    await User.findById(user_id).then((user_data) => {
      const level_2 = async () => {
        arr1 = await User.find({
          _id: { $in: user_data.indirectMember },
        }).clone();
        res.status(200).json({ level2: arr1 });
      };
      level_2();
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

exports.lvl3 = async (req, res) => {
  const { user_id } = req.body;
  try {
    await User.findById(user_id).then((user_data) => {
      const level_3 = async () => {
        arr1 = await User.find({
          _id: { $in: user_data.in_indirectMember },
        }).clone();
        res.status(200).json({ level3: arr1 });
      };
      level_3();
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong!" });
  }
};

exports.withdrawalSum = async (req, res) => {
  const { user_id } = req.body;
  var wSum = 0;
  try {
    await Withdrawal.find({ user_id: user_id }).then((response) => {
      response.map((element) => {
        wSum += element.withdrawalAmount;
      });
      res.status(200).json({ wSum: wSum });
    });
    //res.status(200).json({ message: 'Check Message Inbox for password' });
  } catch (error) {
    res.status(400).json({
      messaage: "Something went wrong!",
    });
  }
};

exports.get_user_count = async (req, res) => {
  try {
    const query = await User.find().count();
    res.status(200).json({
      user_count: query,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.get_all_users = async (req, res) => {
  try {
    const response = await User.find();
    res.status(200).json({
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.update_earning = async (req, res) => {
  const data = req.body;

  try {
    await User.updateOne(
      { _id: data.user_id },
      {
        $inc: {
          balance: data.earn,
          earning: data.earn,
        },
        $set: {
          plans_purchased: data.temp,
        },
      }
    );
    res.status(200).json({
      message: "Reward Successfully Updated!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.get_user = async (req, res) => {
  const { user_id } = req.body;
  try {
    await User.findOne({ _id: user_id }).then((response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.get_amounts = async (req, res) => {
  try {
    await Amount.findById("656b2cf62f2175f4a8fbbceb").then((response) => {
      res.status(200).json(response);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "something went wrong!",
    });
  }
};

exports.get_user_recharges = async (req, res) => {
  // console.log('hit');
  const { user_id } = req.body;
  try {
    // await Recharge.find().where("user_id").equals(user_id).exec((err, result) => {
    //   res.status(200).json(result);
    const data = await Recharge.find({ user_id });
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.dashboard_data = async (req, res) => {
  try {
    const response1 = await User.aggregate([
      {
        $group: {
          _id: null,
          total_balance: { $sum: "$balance" }, // for your case use local.balance
        },
      },
    ]);
    const response2 = await Recharge.aggregate([
      {
        $match: { status: "confirmed" },
      },
      {
        $group: {
          _id: null,
          total_recharge: { $sum: "$recharge_value" }, // recharge_value
        },
      },
    ]);

    const response3 = await Withdrawal.aggregate([
      {
        $match: { status: "confirmed" },
      },
      {
        $group: {
          _id: null,
          total_withdrawal: { $sum: "$withdrawalAmount" },
        },
      },
    ]);
    res.status(200).json({
      totalBalance: response1[0].total_balance,
      totalRecharge: response2[0].total_recharge,
      totalWithdrawal: response3[0].total_withdrawal,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.amount_setup = async (req, res) => {
  const data = req.body;
  try {
    const response = await Amount.create(data).then((res) => res);
    res.status(200).json({
      message: "Amount Updated Successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong!",
    });
  }
};

exports.add_controller = async (req, res) => {
  const data = req.body;
  try {
    const response = await Controller.create(data).then((res) => res);
    res.status(200).json({
      message: "User Created Successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong!",
    });
  }
};

exports.get_controllers = async (req, res) => {
  try {
    const response = await Controller.find();
    res.status(200).json({
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong!",
    });
  }
};

// exports.update_amounts = async (req, res) => {
//   try {
//     await Amount.updateOne({ _id: "656b2cf62f2175f4a8fbbceb" }, {
//       $set: {
//         ...req.body
//       }
//     });
//     res.status(200).json({
//       message: 'Amounts updated successfully!'
//     })
//   } catch (error) {
//     res.status(400).json({
//       message: 'Something went wrong!'
//     })
//   }
// }

exports.delete_controller = async (req, res) => {
  const { user_id } = req.body;
  console.log(user_id);
  try {
    await Controller.deleteOne({ _id: user_id });
    res.status(200).json({
      message: "Controller deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

// exports.admin_login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     await Controller.findOne({ email: email, password: password }).then(
//       (err, result) => {
//         if (err) {
//           return res.send(err);
//         } else if (!result) {
//           return res.send({
//             message: "Invalid email/password, please try again!",
//           });
//         } else {
//           return res.send(result);
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       message: "Something went wrong!",
//     });
//   }
// };

exports.admin_login = async (req, res) => {


  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Either Email Or Password is Missing",
      });
    }
    const user = await Controller.findOne({ email: email, password: password }).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "Either Email or Password is Incorrect",
      });
    }
    const token = jwt.sign(
      { _id: user._id },
      "adsljfhjklasdfhjklansdfjklnasdfhjlkweratfwerafgbwfadstgwaswerfgbj",
      { expiresIn: "27d" }
    );

    res.status(200).json({
      user,
      token
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.requireSignin = expressjwt({
  secret: "adsljfhjklasdfhjklansdfjklnasdfhjlkweratfwerafgbwfadstgwaswerfgbj",
  algorithms: ["HS256"],
});

// exports.update_plan_state = async (req, res) => {
//   const { new_plan_state } = req.body;
//   try {
//     await Amount.updateOne({ _id: "656b2cf62f2175f4a8fbbceb" }, {
//       $set: {
//         plan_state: new_plan_state
//       }
//     });
//     res.status(200).json({
//       message: 'Plan Status updated'
//     });
//   } catch (error) {
//     res.status(400).json({
//       message: 'Something went wrong!'
//     });
//   }
// }

exports.get_all_controllers = async (req, res) => {
  try {
    const response = await Controller.find({});
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.get_all_feedbacks = async (req, res) => {
  try {
    const response = await Feedback.find({});
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.add_blocked_users = async (req, res) => {
  const { user_id } = req.body;
  try {
    await Blocked.create({ user_id }).then(() => {
      res.status(200).json({
        message: "User Blocked Successfully!",
      });
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.get_user_withdrawals = async (req, res) => {
  // console.log('hit','with');
  const { user_id } = req.body;
  try {
    // await Withdrawal.find().where("user_id").equals(user_id).exec((err, result) => {
    //   res.status(200).json(result);
    // })
    const data = await Withdrawal.find({ user_id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.get_paginated_user = async (req, res) => {
  const { options } = req.body;

  try {
    await User.paginate({}, options, function (err, result) {
      //console.log(result);
      //console.log(err);
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

exports.update_balance = async (req, res) => {
  const { new_balance, user_id } = req.body;
  try {
    await User.updateOne(
      { _id: user_id },
      {
        $set: {
          balance: new_balance,
        },
      }
    ).then((response) => {
      res.status(200).json({ message: "Balance successfully updated" });
    });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

exports.search_users = async (req, res) => {
  const { searchField } = req.body;
  try {
    await User.find({ mobno: { $regex: new RegExp(`^${searchField}`) } }).then(
      (result) => {
        // console.log(result);
        // console.log(err);
        res.status(200).json(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "something went wrong!",
    });
  }
};

exports.get_promo_amount = async (req, res) => {
  const max = 20,
    min = 1;
  const { promo_code, user_id } = req.body;
  const availed_promocodes = await User.findById(user_id).then(
    ({ availed_promocode }) => availed_promocode
  );
  const admin_promo = await Amount.findById("656b2cf62f2175f4a8fbbceb").then(
    ({ promo_code }) => promo_code
  );
  const reward = Math.floor(Math.random() * (max - min + 1)) + min;
  try {
    if (availed_promocodes.includes(promo_code)) {
      res.status(200).json({
        message: "Promocode already availed",
      });
    } else if (admin_promo !== promo_code) {
      res.status(200).json({ message: "Invalid Promo Code" });
    } else {
      await User.updateOne(
        { _id: user_id },
        {
          $push: {
            availed_promocode: promo_code,
          },
          $inc: {
            balance: reward,
          },
        }
      );
      res.status(200).json({
        message: "Reward Successfully added",
        reward,
      });
    }
  } catch (error) {
    res.status(400).json({
      messaage: "Something went wrong!",
    });
  }
};

// exports.lvl1commisions = async (req, res) => {

// }

exports.commission = async (req, res) => {
  const { _id } = req.body;

  const commissionData = await User.findById(_id, { comissionData: 1, _id: 0 });
  return res.send(commissionData);
};

exports.userdetailsUpdate = async (req, res) => {
  const { name, email, _id } = req.body;

  await User.updateOne(
    { _id },
    {
      $set: {
        email,
        name,
      },
    }
  )
    .then(() => {
      res.status(200).json({
        message: "Data Successfully Changed",
      });
    })
    .catch((error) => {
      console.log(error);
      if (error) {
        res.status(400).json({
          message: "Something went wrong",
        });
      }
    });
};

exports.signinReward = async (req, res) => {
  const { _id } = req.body;
  const date = new Date();
  const data = await User.findById(_id);
  if (data) {
    if (data.last_signin_reward < date) {
      await User.updateOne(
        { _id },
        {
          $addToSet: {
            rewardData: {
              title: "Daily attendance",
              date: new Date().toDateString(),
              reward: 7,
            },
          },
          $inc: {
            // earning: 7,
            balance: 7,
            rewards: 7,
          },
          $set: {
            last_signin_reward: date.setDate(date.getDate() + 1),
          },
        }
      )
        .then((responce) => {
          res.status(200).json({
            message: "reward updated",
            last_signin_reward: date.setDate(date.getDate() + 1),
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({
            message: "something went wrong",
          });
        });
    } else {
      res.status(200).json({
        message: "Come back tomorrow",
      });
    }
  } else {
    res.status(400).json({
      message: "something went wrong",
    });
  }
};

exports.task_reward = async (req, res) => {
  const { _id, count, reward } = req.body;

  await User.findById(_id)
    .then((data) => {
      // console.log(data.vipMemcount);

      if (count === 0) {
        vipValue = 0;
      }
      if (count === 5) {
        vipValue = 1;
      }
      if (count === 10) {
        vipValue = 2;
      }
      if (count === 20) {
        vipValue = 3;
      }
      if (count === 35) {
        vipValue = 4;
      }
      if (count === 50) {
        vipValue = 5;
      }
      if (count === 80) {
        vipValue = 6;
      }
      if (count === 150) {
        vipValue = 7;
      }
      if (count === 250) {
        vipValue = 8;
      }
      if (count === 500) {
        vipValue = 9;
      }
      if (count === 800) {
        vipValue = 10;
      }

      if (data.vipMemcount < count) {
        User.updateOne(
          { _id },
          {
            $inc: {
              // earning: 7,
              balance: reward,
              rewards: reward,
            },
            $set: {
              vipMemcount: count,
              vipLevel: vipValue,
            },
            $addToSet: {
              rewardData: {
                title: "Vip Reward",
                date: new Date(),
                reward: reward,
              },
            }
          }
        )
          .then((responce) => {
            console.log(responce);
            res.status(200).json({
              message: "invitation reward recived",
            });
          })
          .catch((error) => {
            res.status(200);
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.deletePlan = async (req, res) => {
  const { user_id, key } = req.body;

  var plans;

  await User.findById(user_id).then((data) => {
    plans = data.plans_purchased.filter((e, index) => index !== key);
    console.log(plans);
  });

  await User.findByIdAndUpdate(user_id, {
    $set: {
      plans_purchased: plans,
    },
  })
    .then(() => {
      console.log("plan deleted");
      res.status(200).json({
        message: "invitation reward recived",
      });
    })
    .catch((error) => console.log("error in deleting plan line no. 1336"));
};

exports.promocode = async (req, res) => {
  const { rewardCode, noOfReward } = req.body;
  const data = { rewardCode, noOfReward, reward_given: 0 };
  await Amount.findByIdAndUpdate("656b2cf62f2175f4a8fbbceb", {
    $addToSet: { promo_code: data },
  })
    .then(() => {
      res.status(200).json({
        message: "success",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        message: "failed",
      });
    });
};

exports.teamrecharge = async (req, res) => {
  try {
    const { _id } = req.body;
    let totalRecharge = 0,
      todayRecharge = 0;
    const today = new Date().toDateString();

    const user = await User.findById(_id);

    const lvl1 = await User.find({ _id: { $in: user.directMember } })
      .clone()
      .then((data) => {
        data.forEach(async (e) => {
          await Recharge.find({ user_id: e._id, status: "confirmed" }).then(
            (data2) => {
              data2.forEach((e2) => {
                totalRecharge += e2.recharge_value;
                if (new Date(e2.time)?.toDateString() === today) {
                  todayRecharge += e2.recharge_value;
                }
              });
            }
          );
        });
      });

    const lvl2 = await User.find({ _id: { $in: user.indirectMember } })
      .clone()
      .then((data) => {
        data.forEach(async (e) => {
          await Recharge.find({ user_id: e._id, status: "confirmed" }).then(
            (data2) => {
              data2.forEach((e2) => {
                totalRecharge += e2.recharge_value;
                if (new Date(e2.time)?.toDateString() === today) {
                  todayRecharge += e2.recharge_value;
                }
              });
            }
          );
        });
      });

    const lvl3 = await User.find({ _id: { $in: user.in_indirectMember } })
      .clone()
      .then((data) => {
        data.forEach(async (e) => {
          await Recharge.find({ user_id: e._id, status: "confirmed" }).then(
            (data2) => {
              data2.forEach((e2) => {
                totalRecharge += e2.recharge_value;
                if (new Date(e2.time)?.toDateString() === today) {
                  todayRecharge += e2.recharge_value;
                }
              });
            }
          );
        });
      });

    // const recharges = await Withdrawal.find();

    // if (recharges) {

    //   var amount = 0;

    //   recharges.forEach(element => {
    //     amount += element.afterDeduction
    //   });

    //   console.log(amount);

    // }

    res.status(200).json({ todayRecharge, totalRecharge });
  } catch (error) {
    console.log(error);
    res.status(200).json({ todayRecharge, totalRecharge });
  }
};

exports.getFilteredWithdrawl = async (req, res) => {
  try {
    const { date, type } = req.body;

    const userDate = new Date(date);
    console.log(userDate);

    if (type === "widthdrawl") {
      const todaywithdrawl = await Withdrawal.aggregate([
        {
          $match: {
            $expr: {
              $eq: [
                { $dateToString: { format: "%m-%d-%Y", date: "$time" } }, // Format date to YYYY-MM-DD
                { $dateToString: { format: "%m-%d-%Y", date: userDate } },
              ],
            },
            status: "confirmed",
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$withdrawalAmount" },
          },
        },
      ]);
      res.status(200).json({ todaywithdrawl });
    }

    if (type === "recharge") {
      const todaywithdrawl = await Recharge.aggregate([
        {
          $match: {
            $expr: {
              $eq: [
                { $dateToString: { format: "%m-%d-%Y", date: "$time" } }, // Format date to YYYY-MM-DD
                { $dateToString: { format: "%m-%d-%Y", date: userDate } },
              ],
            },
            status: "confirmed",
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$recharge_value" },
          },
        },
      ]);
      res.status(200).json({ todaywithdrawl });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ error });
  }
};
