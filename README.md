
# About this project:
- This's a decentralized platform where users donate ETH to support cases and receive CRED tokens in return.
- Built on Scroll Sepolia testnet.
#### Directory Structure
```bash
  |-- src/                 # Smart contracts
  |   |__Credits.sol      # ERC-20 token implementation (CRED)
  |   |__Donation.sol     # Donation and voting contract
  |-- scripts/             # Deployment scripts
  |-- test/                # Foundry test cases
  |-- donation-ui/         # Frontend 
  |   | |__app/
  |   | |  |__donate/      # donate page
  |   | |  |__profile/     # profile page
  |   | |_ page.tsx        # home page
  |   |__lib/
  |       |_contracts      # Contracts ABIs and Addresses
  |   |__ etc
  |__ .env         # Environment variable configuration
```


# Design patterns
- Inheritance (Ownable)
- Ownable (Access Control)
- Inter-Contract Execution (donation.sol use credit.sol to mint "CRED" tokens)
- Take control of Credits minting by transferring the ownership (manually) to the Donation.sol contract.

# Security measures
- Using Specific Compiler Pragma
- Proper Use of Require
- Checks-Effects-Interactions

# Important links & Addresses
- Testnet Contracts (Scroll Sepolia):
  - Credits: 0x7a59fc37597f911bae74270ae21d1de0a3942e00 
  - Donation: 0x2c787f2e028e07731593137d422acdc038b7ccc2


- Frontend Hosting (vercel): [Click the link](https://donation-dapp-graduation-project.vercel.app/)

# How to run tests
- Navigate to the project root:
```bash
  cd ~/Donation-DApp
  forge test
```
- Tests cover:
  - Token minting (Credits)
  - Voting logic (Donation)

# How to run the program
###### Local Setup
- Clone the repo and install dependencies:
```bash
  git clone https://github.com/mhm000d/blokkat-arabic-blockchain-developer-bootcamp-graduation-project.git
  cd ~/cd Donation-DApp
  npm install
```
- Edit .env to your own project_id:
  - e.g. NEXT_PUBLIC_PROJECT_ID=your own project_id


- To start donation-ui (frontend):
```bash
  cd donation-ui && npm run dev
```
# Demo
##### [Check out the full video](https://youtu.be/aK5OMq8yp2o)


