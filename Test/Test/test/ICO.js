var Coin = artifacts.require("Coin");

contract('Coin', function(accounts) {

    it ("should mint", function() {
        var meta;
        return Coin.deployed().then(function(instance) {
            meta = instance;
            meta.mint(accounts[0], 30);
        }).then(function() {
            return meta.balanceOf(accounts[0]);
        }).then(function(balance) {
            assert.equal(balance.valueOf(), 30, "Minting went wrong")
        });
    });

    it('should transfer 10', function () {
        var meta;
        var account_one = accounts[0];
        var account_two = accounts[1];

        var account_one_starting_balance;
        var account_two_starting_balance;
        var account_one_ending_balance;
        var account_two_ending_balance;
        var amount = 10;
        return Coin.deployed().then(function(instance) {
                meta = instance;
                return meta.balanceOf(account_one);
            }).then(function(balance) {
                account_one_starting_balance = balance.toNumber();
                return meta.balanceOf(account_two);
            }).then(function(balance) {
                account_two_starting_balance = balance.toNumber();
                return meta.transfer(account_two, amount);
            }).then(function() {
                return meta.balanceOf(account_one);
            }).then(function(balance) {
                account_one_ending_balance = balance.toNumber();
                return meta.balanceOf(account_two);
            }).then(function(balance) {
                account_two_ending_balance = balance.toNumber();
                assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
                assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
            });
    });

    it('should transferFrom', function () {
        var meta;
        var account_one = accounts[0];
        var account_two = accounts[1];

        var account_one_starting_balance;
        var account_two_starting_balance;
        var account_one_ending_balance;
        var account_two_ending_balance;
        var amount = 10;
        return Coin.deployed().then(function(instance) {
            meta = instance;
            return meta.balanceOf(account_one);
        }).then(function(balance) {
            account_one_starting_balance = balance.toNumber();
            return meta.balanceOf(account_two);
        }).then(function(balance) {
            account_two_starting_balance = balance.toNumber();
            return meta.approve(account_one, amount);
        }).then(function() {
            return meta.transferFrom(`${account_one}`, `${account_two}`, amount);
        }).then(function() {
            return meta.balanceOf(account_one);
        }).then(function(balance) {
            account_one_ending_balance = balance.toNumber();
            return meta.balanceOf(account_two);
        }).then(function(balance) {
            account_two_ending_balance = balance.toNumber();
            assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
            assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
        });
    })

    it ("should approve", function() {
        var meta;
        var account_one = accounts[0];
        var account_two = accounts[2];
        var initialAllowance;
        return Coin.deployed().then(function(instance) {
            meta = instance;
            return meta.allowance(`${account_one}`, `${account_two}`);
        }).then(function(allowed) {
            initialAllowance = allowed.toNumber();
        }).then(function() {
            meta.approve(account_two, 10);
        }).then(function() {
            return meta.allowance(`${account_one}`, `${account_two}`);
        }).then(function(allowed) {
            assert.equal(allowed.toNumber() - initialAllowance, 10, "Approve went wrong")
        });
    });
});
