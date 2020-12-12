// === OOP version of expanse tracker === //

const balance = document.getElementById("balance");

let totalBalance = 0;
console.log(`total balanc at start :${totalBalance}`)

let totalIncome = 0;

let totalExpense = 0;


if(localStorage.getItem("totalBalance") !== 0) {
    
    balance.innerHTML = localStorage.getItem("totalBalance");
    totalBalance = Number(localStorage.getItem("totalBalance"));
    console.log(`totalbalance after if: ${totalBalance}`)

};

const income = document.getElementById("income");
if(localStorage.getItem("totalIncome") !== 0) {
    
    income.innerHTML = localStorage.getItem("totalIncome");
    totalIncome = Number(localStorage.getItem("totalIncome"));
};


const expense = document.getElementById("expense");
if(localStorage.getItem("totalExpense") !== 0) {
    
    expense.innerHTML = localStorage.getItem("totalExpense");
    totalExpense = Number(localStorage.getItem("totalExpense"));
};


class StoreItems {
    static getItem() {
        let items;
        if(localStorage.getItem("item") === null) {
            items = [];
        } else {
            items = JSON.parse(localStorage.getItem("item"));
        }
        return items;
    }

    static displayItem() {
        const items = StoreItems.getItem();

        items.forEach((item) => {
            const ui = new UI;

            //add item to UI
            //ui.createPlusElement(item);

            if(item.itemCost >= 1) {
                ui.createPlusElement(item);
            } else {
                ui.createMinusElement(item);
            }

        })
    }

    static addItem(item) {
        console.log(item);
        const items = StoreItems.getItem();

        items.push(item);
        localStorage.setItem("item", JSON.stringify(items));
        
    }

    static removeItems(item) {
        const items = StoreItems.getItem();
        items.forEach((item, index) => {
            if(item.itemID === item.itemID) {
                items.splice(index, 1);
            }
        });
        localStorage.setItem("item", JSON.stringify(items));

        


        
    }
}


// === dom load event ===

document.addEventListener("DOMContentLoaded", StoreItems.displayItem);





// === Item class ===

class Item {
    constructor(itemName, itemCost) {
        this.itemID = Math.floor(Math.random() * 1000);;
        this.itemName = itemName;
        this.itemCost = itemCost;
    }
}


// === class UI ===

class UI {
    // === incomes ===
    createPlusElement(item) {
        const list = document.getElementById("list");
        const li = document.createElement("li");
        li.classList.add("plus");
        li.innerHTML = `${item.itemName} <span>${Number(item.itemCost)}</spam>`;
        const btn = document.createElement("button");
        btn.classList.add("delete-btn");
        btn.innerText = "X";
        li.appendChild(btn)
        list.appendChild(li);

       

        // === delete Element if requerd ===
        btn.addEventListener("click", () => {
            const income = document.getElementById("income");
            li.remove();
            totalIncome -= item.itemCost;
            income.innerHTML = `+$${totalIncome.toFixed(2)}`;
            totalBalance = totalIncome - totalExpense;
            balance.innerHTML = totalBalance.toFixed(2);
            localStorage.setItem("totalIncome", JSON.stringify(totalIncome));
            localStorage.setItem("totalBalance", JSON.stringify(totalBalance));
            StoreItems.removeItems(item);
    
        })
    }

        addIncome(item) {
        
            totalIncome += item.itemCost;
            const income = document.getElementById("income");
            income.innerHTML = `+$${totalIncome}`;
        
    }

    // === expanses ===

    createMinusElement(item) {
        const list = document.getElementById("list");
        const li = document.createElement("li");
        li.classList.add("minus");
        li.innerHTML = `${item.itemName} <span>${Number(item.itemCost)}</spam>`;
        const btn = document.createElement("button");
        btn.classList.add("delete-btn");
        btn.innerText = "X";
        li.appendChild(btn)
        list.appendChild(li);

        btn.addEventListener("click", () => {
            const expense = document.getElementById("expense");
            li.remove();
            totalExpense += item.itemCost;
            expense.innerHTML = `-$${totalExpense.toFixed(2)}`;
            totalBalance = totalIncome - totalExpense;
            balance.innerHTML = totalBalance.toFixed(2);
            localStorage.setItem("totalExpense", JSON.stringify(totalExpense));
            localStorage.setItem("totalBalance", JSON.stringify(totalBalance));
            StoreItems.removeItems(item);
        })

    }

    addExpense(item) {
        totalExpense -= item.itemCost;
        const expense = document.getElementById("expense");
        expense.innerHTML = `-$${totalExpense}`;
    }


    // === clear filds ===

    clearFields() {
        document.getElementById("itemName").value = "";
        document.getElementById("itemAmount").value = "";
    }


    /* // === delete item ===

    deleteItem(target) {
        if(target.className === "delete-btn positive") {
            totalIncome
            target.parentElement.remove();
        }

    } */
}






// === add event listenr on form element ===

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {

    // === selecting values fo4getElementById("itemAmount").value;

    const itemName = document.getElementById("itemName").value;

    const itemCost = document.getElementById("itemAmount").value;

    // === create an item object from Item class ===
    const item = new Item(itemName, +itemCost);
    console.log(item)

    const ui = new UI();

     // === add item to local storage ===

     StoreItems.addItem(item)

    if(+itemCost >= 1 && itemName !== "") {
        ui.createPlusElement(item);
        ui.addIncome(item);
        ui.clearFields();


    } else if(+itemCost < 1 && +itemCost !== 0 && itemName !== "") {
        ui.createMinusElement(item);
        ui.addExpense(item);
        ui.clearFields();
    }
    
    // calculate total balance

    
        
    
        // === napomena problem je sto recimo krenemo sa balancom od 5 sto znaci da bi pisalo ove da je 5 = totalIncome(5) - 0 sto znaci da je balanc opet 5 a ne 10
    totalBalance = totalIncome - totalExpense;
    balance.innerHTML = totalBalance.toFixed(2);
    console.log(totalBalance);
    console.log(`total income is: ${totalIncome}`);

    localStorage.setItem("totalIncome", JSON.stringify(totalIncome));
    localStorage.setItem("totalExpense", JSON.stringify(totalExpense));
    localStorage.setItem("totalBalance", JSON.stringify(totalBalance));
        
    
    

    e.preventDefault()
})





/* document.getElementById("list").addEventListener("click", (e) => {
    const ui = new UI();

    
    ui.deleteItem(e.target, );
}) */