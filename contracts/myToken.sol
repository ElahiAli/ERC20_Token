// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract myToken is IERC20 {
  string private name;
  string private symbol;
  uint private _totalSupply;

  mapping(address => uint256) private balances;
  mapping(address => mapping(address => uint256)) allowed;

  constructor(address _walletAddress) {
    name = "MyToken";
    symbol = "MT";
    _totalSupply = 100000;
    balances[_walletAddress] = _totalSupply;
    emit Transfer(address(0), _walletAddress, _totalSupply);
  }

  function transfer(
    address _to,
    uint256 _amount
  ) public override returns (bool success) {
    require(
      balances[msg.sender] >= _amount,
      "ERC20: transfer amount exceeds balance"
    );
    balances[msg.sender] = balances[msg.sender] - _amount;
    balances[_to] = balances[_to] + _amount;
    emit Transfer(msg.sender, _to, _amount);
    return true;
  }

  function approve(
    address _spender,
    uint256 _amount
  ) public override returns (bool success) {
    allowed[msg.sender][_spender] = _amount;
    emit Approval(msg.sender, _spender, _amount);
    return true;
  }

  function transferFrom(
    address from,
    address to,
    uint256 amount
  ) public override returns (bool) {
    balances[from] = balances[from] - amount;
    allowed[from][msg.sender] -= amount;
    balances[to] = balances[to] + amount;
    emit Transfer(from, to, amount);
    return true;
  }

  function allowance(
    address _tokenOwner,
    address _tokenSpender
  ) public view override returns (uint256) {
    return allowed[_tokenOwner][_tokenSpender];
  }

  function balanceOf(
    address _tokenOwner
  ) public view override returns (uint256) {
    return balances[_tokenOwner];
  }

  function totalSupply() external view override returns (uint256) {
    return (_totalSupply - balances[address(0)]);
  }
}
