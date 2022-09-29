function addInput(){
    const container = document.getElementById('input-cont');
    var maxInputAllowed = 5;
    var inputCount = 0;
    
    // Call addInput() function on button click
        inputCount++; // Increment input count by one
        if(inputCount>5){
            alert('You can add maximum 5 input fields.');
            return;
        }
        let input = document.createElement('input');
        input.placeholder = 'Type something';
        container.appendChild(input);
}