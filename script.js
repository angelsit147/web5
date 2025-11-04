document.addEventListener('DOMContentLoaded', () => {

    const block5 = document.getElementById('block5');
    if (block5) {
        const controlsHTML = `
            <style>
                #x:hover {
                    cursor: pointer;
                }
                .js-controls { 
                    padding: 1em; 
                    border-top: 2px solid #ccc; 
                    margin-top: 1em; 
                    min-width: 220px;
                    box-sizing: border-box;
                }
                .js-controls h4 { margin-bottom: 0.5em; }
                .js-controls label { margin-right: 5px; }
                .js-controls input[type="text"], .js-controls input[type="number"] { margin-right: 10px; padding: 5px; }
                .js-controls button { padding: 5px 10px; margin: 0 5px 5px 0; }
                .added-image-container { margin-top: 15px; text-align: center; }
                .added-image-container img { display: block; margin: 0 auto; max-width: 100%; height: auto; }
                .added-image-container button { display: block; margin-top: 5px auto 0 auto; background-color: #980000ff; color: white; border: none; padding: 5px; cursor: pointer; }
            </style>
            <div class="js-controls">
                <h4>Завдання 1 & 2: Кнопки</h4>
                <button id="swapButton">Поміняти місцями блоки 3 та 6</button>
                <button id="trapezoidButton">Обчислити площу трапеції</button>
                <hr>

                <div id="task3Container">
                    <h4>Завдання 3: Дільники числа</h4>
                    <div id="divisorForm">
                        <label for="numberInput">Введіть натуральне число:</label>
                        <input type="number" id="numberInput" min="1">
                        <button id="calculateDivisors">Знайти дільники</button>
                    </div>
                </div>
                <hr>
                <div id="task4Container">
                    <h4>Завдання 4: Форматування блоку 4</h4>
                    <input type="radio" id="capOn" name="format" value="on">
                    <label for="capOn">Великі літери (On)</label>
                    <br>
                    <input type="radio" id="capOff" name="format" value="off">
                    <label for="capOff">Звичайний (Off)</label>
                </div>
                <hr>
                <div id="task5Form" style="display: none;">
                    <h4>Завдання 5: Додати зображення</h4>
                    <label for="imageUrlInput">URL зображення:</label>
                    <input type="text" id="imageUrlInput" placeholder="https://...">
                    <button id="addImageButton">Додати зображення</button>
                </div>
            </div>
        `;
        block5.insertAdjacentHTML('beforeend', controlsHTML);
    }


    const block4 = document.getElementById('block4');
    const blockX = document.getElementById('x');
    const divisorForm = document.getElementById('divisorForm');
    const calculateDivisorsBtn = document.getElementById('calculateDivisors');
    const numberInput = document.getElementById('numberInput');
    const task4Container = document.getElementById('task4Container');
    const capOnRadio = document.getElementById('capOn');
    const capOffRadio = document.getElementById('capOff');
    const task5Form = document.getElementById('task5Form');
    const addImageButton = document.getElementById('addImageButton');
    const imageUrlInput = document.getElementById('imageUrlInput');

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function deleteCookie(name) {
        setCookie(name, '', -1);
    }
    
    const swapButton = document.getElementById('swapButton');
    if (swapButton) {
        swapButton.addEventListener('click', () => {
            const el1 = document.getElementById('block3');
            const el2 = document.getElementById('block6');
            
            if (!el1 || !el2) {
                alert("Помилка: неможливо знайти блоки 3 чи 6.");
                return;
            }

            const el1_content = el1.innerHTML;
            el1.innerHTML = el2.innerHTML;
            el2.innerHTML = el1_content;

            const el1_id = el1.id;
            el1.id = el2.id;
            el2.id = el1_id;
        });
    }


    const trapezoidButton = document.getElementById('trapezoidButton');
    if (trapezoidButton) {
        trapezoidButton.addEventListener('click', () => {
            if (document.getElementById('trapezoidResult')) {
                alert('Площу вже обчислено!');
                return;
            }

            const a = 10, b = 20, h = 7;
            const area = ((a + b) / 2) * h;
            
            const resultElement = document.createElement('div');
            resultElement.id = 'trapezoidResult';
            resultElement.innerHTML = `<p style="font-size: 1.1em; text-align: center;"><h3>(Завдання 2)</h3> Площа трапеції з основами ${a}, ${b} та висотою ${h} дорівнює: <b>${area}</b></p>`;
            
            resultElement.style.marginTop = '1em';
            resultElement.style.borderTop = '1px dashed #999';
            
            const mainContent = document.getElementById('main'); 
            
            if (mainContent) {
                mainContent.appendChild(resultElement);
            } else {
                document.getElementById('block5').appendChild(resultElement);
            }
        });
    }

    function findDivisors(num) {
        const divisors = [];
        for (let i = 1; i <= num; i++) {
            if (num % i === 0) {
                divisors.push(i);
            }
        }
        return divisors;
    }

    (function handleCookieLogic() {
        const divisorForm = document.getElementById('divisorForm');
        const task3Container = document.getElementById('task3Container');
        if (!divisorForm || !task3Container) return;

        const divisorCookie = getCookie('divisors');
        
        if (divisorCookie) {
            divisorForm.style.display = 'none';
            
            const keep = confirm(`Знайдено збережені дані: ${divisorCookie}\n\nБажаєте зберегти ці дані?`);

            if (keep) {
                alert('Cookies збережено. Дані будуть доступні при наступних відвідуваннях.');
                
                const messageElement = document.createElement('p');
                messageElement.innerHTML = `Ваші збережені дані: <b>${divisorCookie}</b>. <br><i>(Щоб скинути, видаліть cookie або натисніть "Скасувати" при наступному оновленні).</i>`;
                messageElement.style.padding = "10px";
                messageElement.style.fontSize = "13px";
                messageElement.style.fontStyle = "italic";
                messageElement.style.backgroundColor = "#f4f4f4";
                messageElement.style.border = "1px solid #ddd";
                
                task3Container.appendChild(messageElement);

            } else {
                deleteCookie('divisors');
                location.reload();
            }
        }
    })();

    if (calculateDivisorsBtn) {
        calculateDivisorsBtn.addEventListener('click', () => {
            const num = parseInt(numberInput.value, 10);
            if (num && num > 0) {
                const divisors = findDivisors(num);
                const resultStr = `Дільники числа ${num}: ${divisors.join(', ')}`;
                
                alert(resultStr);
                
                setCookie('divisors', resultStr, 7);
            } else {
                alert('Будь ласка, введіть дійсне натуральне число.');
            }
        });
    }

    const originalTextNodes = new Map();

    function setTextTransform(element, capitalize) {
        if (!element) return;
        
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        let node;
        const nodes = [];
        while (node = walker.nextNode()) {
            nodes.push(node);
        }
        
        nodes.forEach(node => {
            if (!originalTextNodes.has(node)) {
                originalTextNodes.set(node, node.nodeValue);
            }
            const originalText = originalTextNodes.get(node);
            
            if (capitalize) {
                node.nodeValue = originalText.replace(/(^|\s)(\p{L})/gu, (m, space, char) => space + char.toUpperCase());
            } else {
                node.nodeValue = originalText;
            }
        });
    }

    if (task4Container) {
        task4Container.addEventListener('change', (e) => {
            if (e.target.name === 'format') {
                const shouldCapitalize = (e.target.value === 'on');
                setTextTransform(block4, shouldCapitalize);
                localStorage.setItem('capitalizeBlock4', shouldCapitalize);
            }
        });
    }

    (function loadCapitalizeSetting() {
        if (!block4 || !capOnRadio || !capOffRadio) return; 
        
        const capSetting = localStorage.getItem('capitalizeBlock4');
        
        if (capSetting === 'true') {
            setTextTransform(block4, true);
            capOnRadio.checked = true;
        } else {
            setTextTransform(block4, false);
            capOffRadio.checked = true;
        }
    })();


    function getImageList() {
        return JSON.parse(localStorage.getItem('imageList')) || [];
    }
    function saveImageList(list) {
        localStorage.setItem('imageList', JSON.stringify(list));
    }

    function renderImage(url) {
        const currentBlock4 = document.getElementById('block4'); 
        if (!currentBlock4) return;
        
        const imgContainer = document.createElement('div');
        imgContainer.className = 'added-image-container';

        const img = document.createElement('img');
        img.src = url;
        img.alt = "Додане зображення";
        img.onerror = () => {
            imgContainer.innerHTML = `<p style="color: red;">Не вдалося завантажити зображення</p>`;
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Видалити';
        deleteBtn.dataset.url = url;

        deleteBtn.addEventListener('click', () => {
            imgContainer.remove();
            let images = getImageList();
            images = images.filter(imgUrl => imgUrl !== url);
            saveImageList(images);
        });

        imgContainer.appendChild(img);
        imgContainer.appendChild(deleteBtn);
        currentBlock4.appendChild(imgContainer);
    }

    if (blockX) {
        blockX.addEventListener('click', () => {
            if (task5Form) task5Form.style.display = 'block';
        });
    }

    if (addImageButton) {
        addImageButton.addEventListener('click', () => {
            const url = imageUrlInput.value.trim();
            if (url) {
                renderImage(url);
                const images = getImageList();
                images.push(url);
                saveImageList(images);
                imageUrlInput.value = '';
            } else {
                alert('Будь ласка, введіть URL зображення.');
            }
        });
    }

    (function loadSavedImages() {
        const savedImages = getImageList();
        savedImages.forEach(url => renderImage(url));
    })();

});