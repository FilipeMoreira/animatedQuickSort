let animationSwaps = [];
let stepCounter = 0;
let el = [];

$(document).ready(function() {

	const size = 10;

	let board = $(".board");
	let elements = [];

	let ids = [];

	let baseWidth = parseInt(board.css('width'))/size;

	for (let i = 0; i < size; i++) {
		let baseValue = Math.floor((Math.random() * 10));
		while (ids.contains(baseValue)) baseValue = Math.floor((Math.random() * 10));
		let e = document.createElement('div');
		$(e).attr('id',baseValue+"")
			.addClass('element')
			.css({
				width: baseWidth,
				backgroundColor: `#${baseValue}${baseValue}${baseValue}`,
				color: `#${9-baseValue}${9-baseValue}${9-baseValue}`
			})
			.appendTo(board);
		$(e).text(baseValue);
		$(e).css('left', (ids.length * baseWidth) + 'px');
		ids.push(baseValue);
		elements.push({id: baseValue, element: $(e)});
		el.push({id: baseValue, element: $(e)});
		console.log(ids);
	}

	quickSort(elements,0,elements.length-1);

	console.log(elements.map(x=>x.id));
	console.log(stepCounter);
	console.log(animationSwaps);

	animate(el);

});

function quickSort (elements, lo, hi) {

	if(lo>=hi) return;

    let split = partition(elements, lo, hi);
    quickSort(elements, lo, split-1);
    quickSort(elements, split+1, hi);

}

function partition (elements, lo, hi) {
	let pivot = hi;
    let i =lo;
    let j = hi;

    while(i<j) {
        if(elements[i].id<=elements[pivot].id) i++;
        if(elements[i].id>elements[pivot].id) {   
	        if((elements[i].id>elements[pivot].id) && (elements[j].id<=elements[pivot].id)) {
	        	console.log(`Swapping: [${i},${j}] - ${pivot}`);
	            swap(elements,i,j);
	    		animationSwaps.push([i,j]);

	    		stepCounter++;
	            i++;    
	        }
	        if(elements[j].id>elements[pivot].id) j--;
        }

    }

    return i;
}

function swap (elements,i,j) {
		let temp= elements[i];
	    elements[i]=elements[j];
	    elements[j]=temp;
}

function animate (elements, step = 0) {
	if (step < animationSwaps.length) {
		animateStep(elements,step);
		setTimeout(function() {
			animate(elements, step+1);
		},1000);
	}
}

function animateStep (elements,step) {
	console.log(step);
	let a = elements[animationSwaps[step][0]].element;
	let b = elements[animationSwaps[step][1]].element;

	a.css('box-shadow','0 20px 1px 2px rgba(0,0,0,0.3)');
	b.css('box-shadow','0 20px 1px 2px rgba(0,0,0,0.3)');
	a.css('z-index','3');
	b.css('z-index','3');

	setTimeout(function() {
		a.css('box-shadow','none');
		b.css('box-shadow','none');
		a.css('z-index','1');
		b.css('z-index','1');
	},900);

	a.animate({ bottom: '70px' }, 300);
	b.animate({ bottom: '70px' }, 300);

	let leftA = parseInt(a.css('left'));

	a.animate({ left: parseInt(b.css('left')) + 'px' }, 300);
	b.animate({ left: leftA + 'px' }, 300);

	a.animate({ bottom: '50px' }, 300);
	b.animate({ bottom: '50px' }, 300);

	swap(elements,animationSwaps[step][0],animationSwaps[step][1]);
}

function highlight (element) {
	element.element.css('background-color','#991122');
}

function cooldown (element) {
	element.element.css('background-color','#' + element.id + '' + element.id + '' + element.id);
}

Array.prototype.contains = function(obj) {
    let i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}