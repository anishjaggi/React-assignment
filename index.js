


let tableWrapper = document.getElementById('table-wrapper');

let tableHeaders = document.getElementById('table-headers');

let table = document.createElement('table');

let tHead = document.createElement('thead');

let tr = document.createElement('tr');

let th1 = document.createElement('th');
th1.classList.add('column1');
th1.innerHTML = 'Id';

let th2 = document.createElement('th');
th2.classList.add('column2');
th2.innerHTML = 'FirstName';


let th3 = document.createElement('th');
th3.classList.add('column3');
th3.innerHTML = 'LastName';

let th4 = document.createElement('th');
th4.classList.add('column4');
th4.innerHTML = 'Email';

let th5 = document.createElement('th');
th5.classList.add('column5');
th5.innerHTML = 'Phone';

tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);
tr.appendChild(th5);
tHead.appendChild(tr);
table.appendChild(tHead);
tableHeaders.appendChild(table);
tableWrapper.appendChild(tableHeaders);



const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D', true);

xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        // console.log(json);

        let infoWrapper = document.getElementById('info-wrapper');

        let h1 = document.createElement('h1');
        infoWrapper.appendChild(h1);
        h1.innerHTML = 'Details';
        let p1 = document.createElement('p');
        infoWrapper.appendChild(p1);
        p1.innerHTML = 'Click on a table item to get detailed information';

        let mainDiv = document.getElementById('main-div');
        mainDiv.appendChild(infoWrapper);

        for (let counter = 0; counter <= json.length; counter++) {
            // console.log(json[counter]);
            let tableData = document.getElementById('table-data');
            let table2 = document.createElement('table');
            let tableBody2 = document.createElement('tbody');
            let tr2 = document.createElement('tr');
            tr2.classList.add('data-row');
          
            let td1 = document.createElement('td');
            td1.classList.add('column1');
            td1.innerHTML = json[counter].id

            let td2 = document.createElement('td');
            td2.classList.add('column2');
            td2.innerHTML = json[counter].firstName;

            let td3 = document.createElement('td');
            td3.classList.add('column3');
            td3.innerHTML = json[counter].lastName;

            let td4 = document.createElement('td');
            td4.classList.add('column4');
            td4.innerHTML = json[counter].email;

            let td5 = document.createElement('td');
            td5.classList.add('column5');
            td5.innerHTML = json[counter].phone;

            tr2.appendChild(td1);
            tr2.appendChild(td2);
            tr2.appendChild(td3);
            tr2.appendChild(td4);
            tr2.appendChild(td5);

            tr2.addEventListener('click', onClickEventHandler);
            var nTr= document.getElementsByClassName('data-row');
            function onClickEventHandler() {
             
                var prev;
                //adding styles in rows on click.
                for (var i = 0; i < nTr.length; i++) {
                    nTr[i].addEventListener("click", function(e) {
                        if (prev != undefined) {
                            prev.classList.remove("active");
                        }
                        this.classList.add("active");
                        // infocontent.style.display = "block";
                        prev = this;
                    }
                     ) }
                
              


                let detailHtml = '';
                console.log('row is pressed');
                let detailsBox = `    
                <h1>Details</h1>
                <p>Click on a table item to get detailed information</p>
                <div id="info-content">
                <div><b>User selected:</b>${json[counter].firstName} ${json[counter].lastName}</div>
                <div>
                <b>Description: </b>
                <textarea cols="50" rows="5" readonly>
                ${json[counter].description}
               </textarea>
                 </div>
                <div><b>Address:</b>${json[counter].address.streetAddress}</div>
                 <div><b>City:</b> ${json[counter].address.city}</div>
                <div><b>State:</b>${json[counter].address.state} </div>
                <div><b>Zip:</b>${json[counter].address.zip}</div>
</div>
</div>`
                detailHtml += detailsBox;
                
                infoWrapper.innerHTML = detailHtml;
                
               

            }
            tableBody2.appendChild(tr2);
            table2.appendChild(tableBody2);
            tableData.appendChild(table2);
            tableWrapper.appendChild(tableData);
        }
    }
    else {
        console.log('some error occured');
    }

}
var nTr= document.getElementsByClassName('data-row');
var searchbox = document.getElementById("search-box");
searchbox.addEventListener("keyup", function() {
    console.log("keyup");
    for (var i = 0; i < nTr.length; i++) {
        var fname = nTr[i].childNodes[1].innerHTML.toUpperCase();
        if (fname.indexOf(searchbox.value.toUpperCase()) < 0) {
            nTr[i].style.display = "none";
        } else {
            nTr[i].style.display = "block";
        }
    }
});
xhr.send();