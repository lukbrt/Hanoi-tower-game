var initialDiscWidth = 120;
var discAmount = 4; //4 is the default value
var moveCounter = 0;

var discGroups = document.getElementById("discGroup");
var discGroup = discGroups.querySelectorAll("ul");
var range = document.getElementById("customRange2");
var counterElement = document.getElementById("counter");

// for (var i = 0; i < discAmount; i++)
// {
//     alert(discGroup[i].innerHTML);
// }
// document.addEventListener('click', function(){alert(discGroup.length)}, false);

function initializeDiscs()
{
    // 
    discGroups = document.getElementById("discGroup");
    discGroup = discGroups.querySelectorAll("ul");
    // 
    var firstStickContent = discGroup[0].innerHTML;
    var width;
    var ratio = initialDiscWidth / discAmount;

    for (var i = 0; i < discAmount; i++)
    {
        width = initialDiscWidth - (discAmount - i - 1) * ratio;
        firstStickContent += '<li class=\"disc\" draggable=\"true\" id=\"disc' + i + '\" style=\"width: '; 
        firstStickContent += width + 'px;\"';
        firstStickContent += 'ondragstart=\"drag(event)\"' + '></li>';
        discGroup[0].innerHTML = firstStickContent;
        // 'ondrop = \"drop(event)\" ondragover = \"allowDrop(event)\"' + 
    }
}

function allowDrop(e)
{
    e.preventDefault();
}

function drag(e)
{
    var targetId = e.target.id;
    var element = document.getElementById(targetId);
    // var first = element.parentElement.firstChild;
    if (!element.previousElementSibling)

        e.dataTransfer.setData("text", targetId);
}

function drop(e)
{
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    var elementToMove = document.getElementById(data);
    var destinationElement = document.getElementById(e.target.id);
    var firstDestinationElement = destinationElement.firstChild;

    // Stick group doesn't have any disc or the highest disc on the pile is wider than the currently kept
    if (!firstDestinationElement.id || getIdNumber(firstDestinationElement.id) > getIdNumber(elementToMove.id))
    {
        destinationElement.insertBefore(elementToMove, firstDestinationElement);

        incrementCounter();
    }
}

function chooseDiscAmount(e)
{
    var newValue = range.value;
    if (newValue !== discAmount)
    {
        discAmount = range.value;
        clearPlayfield();

        initializeDiscs();
    }
}

function getIdNumber(id)
{
    return id.replace("disc", '');
}

function resetCounter() 
{
    moveCounter = 0;
    counterElement.innerText = moveCounter;
}

function clearPlayfield()
{
    for (var i = 0; i < discGroup.length; i++)
    {
        while (discGroup[i].firstChild)
        {
            discGroup[i].removeChild(discGroup[i].firstChild);
        }
    }

    resetCounter();
}

function incrementCounter()
{
    moveCounter++;
    counterElement.innerText = moveCounter;
    
}

initializeDiscs();
range.addEventListener('mouseup', chooseDiscAmount, false);
resetCounter();
