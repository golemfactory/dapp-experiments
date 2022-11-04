const searchInput = document.getElementById('search');
const resultList = document.getElementById('result-list');

document.getElementById('search-button').addEventListener('click', () => {
    const query = searchInput.value;
    fetch('https://nominatim.openstreetmap.org/search?format=json&polygon=1&addressdetails=1&q=' + query)
        .then(result => result.json())
        .then(parsedResult => {
            setResultList(parsedResult);
        });
});

function setResultList(parsedResult) {
    resultList.innerHTML = "";
    for (const result of parsedResult) {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'list-group-item-action');
        li.innerHTML = JSON.stringify({
            displayName: result.display_name,
            lat: result.lat,
            lon: result.lon
        }, undefined, 2);
        li.addEventListener('click', (event) => {
            for (const child of resultList.children) {
                child.classList.remove('active');
            }
            event.target.classList.add('active');
            const clickedData = JSON.parse(event.target.innerHTML);
            $.ajax({
                type: 'GET',
                url: `/api/v1/weather?lat=${clickedData.lat}&long=${clickedData.lon}`,
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    $("#address").text(result.location.address);
                    $("#temperature").text(result.temperature);
                }
            })
        })
        resultList.appendChild(li);
    }
}
