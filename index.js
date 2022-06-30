class Shape{
    constructor(color, index) {
        this._color = color;
        this._shape = '';
        this._index = index;
    }

    getArea() {
        console.log('TO DO');
    }

    getPerimeter() {
        console.log('TO DO');
    }

    animate(){
        const element = Array.from(document.querySelectorAll('.card')).find(item => {
            return item.getAttribute('shape-index').toString() === this._index.toString();
        });
        if(element){
            element.querySelector('.shape').classList.add('shape_animation-rotate');
            setTimeout(() => {
                element.querySelector('.shape').classList.remove('shape_animation-rotate');
            }, 5000);
        }
    }

    getTemplate(){
        const newNode = document.querySelector('.template-card').content.querySelector('.card').cloneNode(true);
        newNode.setAttribute('shape-index', this._index);
        newNode.querySelector('.shape').classList.add(`shape_type-${this._shape}`);
        newNode.querySelector('.shape').classList.add(`shape_color-${this._color}`);
        return newNode;
    }
}

class Square extends Shape {
    constructor(data, index) {
        super(data.color, index);
        this.side = data.side;
        this._shape = 'square';
    }

    getArea() {
        return this.side * this.side;
    }

    getPerimeter() {
        return this.side * 4;
    }
}

class Triangle extends Shape {
    constructor(data, index) {
        super(data.color, index);
        this._base = data.base;
        this._heigth = data.heigth;
        this._shape = 'triangle';
    }

    getArea() {
        return (this._heigth * this._base) / 2;
    }

    getPerimeter() {
        return this._base * 3;
    }
}

class Circle extends Shape {
    constructor(data, index) {
        super(data.color, index);
        this._radio = data.radio;
        this._shape = 'circle';
    }

    getArea() {
        return (this._radio**2) *  Math.PI;
    }

    getPerimeter() {
        return (2*this._radio) * Math.PI;
    }

    getTemplate() {
        const template = super.getTemplate();
        template.querySelector('.shape__content').textContent = this._shape;
        return template;
    }
}

const shapes = [];

shapes.push(new Square({side: 5, color: 'red'}, 0));
shapes.push(new Triangle({base: 10, heigth: 10,  color: 'green'}, 1));
shapes.push(new Circle({radio: .5,  color: 'blue'}, 2));


shapes.map(item => {
    document.querySelector('.root').append(item.getTemplate());
})

document.querySelector('.root').addEventListener('click', (event)=> {
    const target = event.target;
    const parent = target.parentElement;
    const index = parent.getAttribute('shape-index');
    if(target.classList.contains('card__button-animate')){
        shapes[index].animate();
    }else if(target.classList.contains('card__button-perimeter')){
        alert('El perimetro es de: ' + shapes[index].getPerimeter());
    }else if(target.classList.contains('card__button-area')){
        alert('El area es de: ' + shapes[index].getArea());
    }
});
