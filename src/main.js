const app = document.getElementById("app");

function createButton(onclick,name){
    const button = document.createElement("button");
    button.classList.add("btn");
    button.textContent = String(name);
    button.onclick = onclick;
    return button;
}
function calculate(left,right,operator){
    let result = 0;
    left = Number(left);
    right = Number(right);
    switch (operator){
        case "+":
            result = left + right;
            break;
        case "-":
            result = left - right;
            break;
        case "/":
            result = left / right;
            break;
        case "*":
            result = left * right;
            break;
    }
    return result;
}
class Node{
    left = null;
    right = null;
    operator = null;
    constructor(left,right,operator) {
        this.left = left;
        this.right = right;
        this.operator = operator;
    }
    calculateAllNode(){
        let result ;
        let left,right;
        if(this.left === null){
             left = 0
        }
        if(this.right === null){
            right = 0
        }
        if(typeof this.left==="number"||typeof this.left==="string"){
            left = this.left;
        }else {
            left = this.left.calculateAllNode();
        }
        if(typeof this.right==="number"||typeof this.right==="string"){
            right = this.right;
        }else {
            right = this.right.calculateAllNode();
        }
        result = calculate(left,right,this.operator);
        return result;
    }
}
function ArrayToNodes(arr){
    let root = new Node(arr[0],arr[2],arr[1]);
    if(arr.length <=3)return root;
    for(let i=2;i<=arr.length-3;i+=2){
        root = new Node(root,arr[i+2],arr[i+1]);
    }
    return root;
}
customElements.define('my-calculate', class extends HTMLElement {
    input = document.createElement("input");
    operators = ['+','-','/','*'];
    constructor() {
        super();
        this.classList.add("calculate");
        this.appendChild(this.input);
        this.input.value= String(0);
        this.panel = document.createElement("div");
        this.panel.classList.add("panel");
        ['0','1','2','3','4','5','6','7','8','9',...this.operators].forEach(char=>{
            this.panel.appendChild(createButton(()=>this.input.value+=char,char));
        })
        this.panel.appendChild(createButton(()=>{
            const value = this.input.value.split('');
            value.pop();
            this.input.value = value.join("");
        },"del"));
        this.panel.appendChild(createButton(()=>{
            this.calculate();
        },"="));
        this.appendChild(this.panel)
    }
    calculate(){
        const  value = this.input.value;
        const arr = value.split(/(\D)/).map(item => item.trim()).filter(item => item);
        this.input.value = ArrayToNodes(arr).calculateAllNode();
    }
});

app.innerHTML=`<my-calculate/>`;