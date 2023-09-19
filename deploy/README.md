# bank_account_management

## STACKUP BANK

1. Input valid username as two names separated by a space and value of money to be deposited upwards of 500. Choose where to save the deposited cash whether in the checking or savings account. Values contrary to these trigger an alert requesting for valid information.

2. On Clicking the register button all other functionalities of the system are activated, since a user is created and can now perform other activities.

## CLASS Bank

1. Registering triggers a function which which runs and instantiates both the Client class and Bank class which capture the keyed in details.

2. The Client class creates a user with the specified details which are then stored in a private variable in the Bank class which holds all the details.
   When instantiated, depending on the account chosen, whether savings or checking, the amount is stored in the respective account.

3. The Bank class is instantiated in the `newUser` function which calls the `addClient` method from the Bank class and adds all the details to the `listArr` stored in the class while also creating an account number for issue to the new account holder.

4. The `checkBalance` method sends an alert showing the available balance on both accounts of the user.

5. For all deposits a user is asked on the favorite account to deposit on. This is done by the `deposit` method. All withdrawals are made from the checking account ONLY.

## TRY-CATCH-FINALLY

- The `withdraw` method performs a `try-catch-finally` statement to test whether a user has an available balance or whether the balance is zero and respectively throws an error if requested amount to be withdrawn is less than available balance or the balance is 0. With a greater checking balance than the requested amount, a user can successfully withdraw.

## SWITCH STATEMENT

- The `switch` statement is incorporated in a function `calculations`, which receives its arguments with a some being optional as not all are used in the calls it makes.
  On clicking the `SAVE` button, an option for saving on the savings or checking account is given and on clicking either the `calculations` function is invoked which iniates the switch function that runs checking the various operations passed to it. The `user` instance of the `Bank` allows for access to its methods as it is a global variable.

[STACKUP BANK](github.com 'LINK')
