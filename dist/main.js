const numXmlRequests = 3;
let xmlRequests = 0;

let navInfo = {};
$.ajax({
    type: 'GET',
    url: './assets/json/nav.json',
    dataType: 'json',
    success: (data) =>
    {
        navInfo = data;
        navInfo.thresholds[navInfo.thresholds.length - 1] = Infinity;

        xmlRequests++;
        if (xmlRequests === numXmlRequests) initialize();
    }
})

let introInfo = {};
$.ajax({
    type: 'GET',
    url: './assets/json/intro.json',
    dataType: 'json',
    success: (data) =>
    {
        introInfo = data;
        introInfo.thresholds[introInfo.thresholds.length - 1] = Infinity;

        xmlRequests++;
        if (xmlRequests === numXmlRequests) initialize();
    }
})

let pointsInfo = {}; //point2 offset is 2 - 0.86 - 0.71 = 0.43
$.ajax({
    type: 'GET',
    url: './assets/json/points.json',
    dataType: 'json',
    success: (data) =>
    {
        pointsInfo = data;
        Object.values(pointsInfo).forEach((point) =>
        {
            point.thresholds[point.thresholds.length - 1] = Infinity;
            Object.assign(point.text, point.textInvisible);
        });

        xmlRequests++;
        if (xmlRequests === numXmlRequests) initialize();
    }
})

const nav = document.querySelector('nav');
const navFade = document.querySelector('#nav-fade')
const transitionTime = 0.6;

let isNavOpen = false;
let navWidth = 19;
function openNav()
{
    nav.style.transition = `right ${transitionTime}s`;

    nav.style.right = '0';
    navFade.style.backgroundColor = '#211d3350';

    navFade.style.zIndex = 4;

    isNavOpen = true;
}

function closeNav()
{
    nav.style.transition = `right ${transitionTime}s`;

    nav.style.right = `-${navWidth + 2}vw`;
    navFade.style.backgroundColor = '#211d3300';

    isNavOpen = false;

    setTimeout(() =>
    {
        if (!isNavOpen) 
        {
            nav.style.transition = '0s';
            navFade.style.zIndex = -1;
        }
    }, transitionTime * 1000);
}

const navList = nav.querySelector('ul');
const navListItems = nav.querySelectorAll('li');

const menuBars = document.querySelectorAll('#menu-button .bar');

function updateNav()
{
    nav.style.transition = '0s';

    for (let i = 0; i < navInfo.thresholds.length; i++)
    {
        if (window.innerWidth < navInfo.thresholds[i])
        {
            navWidth = navInfo.widths[i];
            nav.style.width = `${navWidth}vw`;
            if (parseFloat(getComputedStyle(nav).right) < -0.1) nav.style.right = `-${navWidth + 2}vw`;

            navList.style.left = navInfo.items.lefts[i];
            navList.style.fontSize = navInfo.items.sizes[i];

            navListItems.forEach((li) =>
            {
                li.style.width = navInfo.items.widths[i];
            });

            menuBars.forEach((bar) =>
            {
                bar.style.width = navInfo.button.widths[i];
                bar.style.height = navInfo.button.heights[i];
                bar.style.margin = navInfo.button.margins[i] + ' 0';
            })

            break;
        }
    }
}

let isOpen = false;
function toggleNav()
{
    if (isOpen)
    {
        closeNav();
        isOpen = false;
    }
    else
    {
        openNav();
        isOpen = true;
    }
}

const menuButton = document.querySelector('#menu-button');
menuButton.onclick = toggleNav;

function initializeCanvas(canvas, displayInfo)
{
    const img = new Image();
    img.src = displayInfo.imgInfo.src;
    img.addEventListener('load', () =>
    {
        displayInfo.img = img;
        displayInfo.imgInfo.loaded = true;

        drawCanvas(canvas, displayInfo);
    }, false);
}

function initializeCanvases()
{
    Object.values(pointsInfo).forEach((point) =>
    {
        Object.assign(point.display, point.displayOff);
        initializeCanvas(document.querySelector(point.canvasId), point.display);
    })
}

function resizeCanvas(canvas, thresholds, alignInfo)
{
    const parent = canvas.parentNode;
    const spacing = parent.querySelector('.canvas-spacing');
    const parentWidth = parent.clientWidth;

    for (let i = 0; i < thresholds.length; i++)
    {
        if (window.innerWidth < thresholds[i])
        {
            canvas.width = parentWidth * alignInfo.scales[i];
            canvas.height = parentWidth * alignInfo.scales[i] / alignInfo.ratio;

            canvas.style.left = `${parentWidth * alignInfo.offsets[i]}px`;

            spacing.style.height = `${parentWidth * alignInfo.spacing[i] / alignInfo.ratio}px`;

            break;
        }
    }
}

function drawCanvas(canvas, displayInfo)
{
    if (displayInfo.imgInfo.loaded)
    {
        const ctx = canvas.getContext('2d');

        const scale = displayInfo.imgInfo.scale;
        const offset = (1 - scale) / 2;

        const filters = displayInfo.filters;

        const width = canvas.clientWidth;
        const height= canvas.clientHeight;

        ctx.clearRect(0, 0, width, height);

        canvas.style.filter = Object.keys(filters).map(k => k + '(' + filters[k] + ')').join(' ');

        ctx.shadowColor = displayInfo.shadowColor;
        ctx.shadowBlur = displayInfo.shadowBlur;

        ctx.drawImage(displayInfo.img, offset * width, offset * height, scale * width, scale * height);
    }
}

function updateCanvases()
{
    resizeCanvas(document.querySelector(introInfo.canvasId), introInfo.thresholds, introInfo.alignment);

    Object.values(pointsInfo).forEach((point) =>
    {
        resizeCanvas(document.querySelector(point.canvasId), point.thresholds, point.alignment);
        drawCanvas(document.querySelector(point.canvasId), point.display)
    });
}

function updateText(textInfo, thresholds)
{
    const text = document.querySelector(textInfo.textId);
    const parent = text.parentNode;
    const parentWidth = parent.clientWidth;

    let top = parent.offsetTop;

    for (let i = 0; i < thresholds.length; i++)
    {
        if (window.innerWidth < thresholds[i])
        {
            top += parentWidth * textInfo.tops[i];
            text.style.top = `${top}px`;
            if (textInfo.hasOwnProperty('lefts')) text.style.left = textInfo.lefts[i];

            text.style.width = textInfo.widths[i];

            text.querySelectorAll('p').forEach(p =>
                {
                    p.style.fontSize = `${textInfo.sizes[i]}vw`;
                })

            text.querySelectorAll('h1').forEach(h =>
                {
                    h.style.fontSize = `${textInfo.h1Ratio * textInfo.sizes[i]}vw`;
                })


            text.style.opacity = textInfo.opacity;

            break;
        }
    }
}

function updateTexts()
{
    updateText(introInfo.text, introInfo.thresholds);

    Object.values(pointsInfo).forEach((point) =>
    {
        updateText(point.text, point.thresholds);
    });
}

function update()
{
    updateNav();
    updateCanvases();
    updateTexts();
}

let states =
{
    '#point1':
    {
        on: false,
    },
    '#point2':
    {
        on: false,
    },
    '#point3':
    {
        on: false,
    }
};

function switchLight(canvas, point, on)
{
    Object.assign(point.display, on ? point.displayOn : point.displayOff);
    drawCanvas(canvas, point.display);
}

function lightOn(canvas, point, state)
{
    setTimeout(() =>
    {
        if (state.on)
        {
            switchLight(canvas, point, true);
            setTimeout(() =>
            {
                if (state.on)
                {
                    switchLight(canvas, point, false);
                    setTimeout(() =>
                    {
                        if (state.on) switchLight(canvas, point, true);
                    }, 70)
                }
            }, 200);
        }
    }, 500)
}

function animateText(point, on)
{
    const text = document.querySelector(point.text.textId);
    text.style.transition = 'all 1s';
    Object.assign(point.text, on ? point.textVisible : point.textInvisible);

    updateText(point.text, point.thresholds);
}

function callback(entries, observer)
{
    entries.forEach(entry =>
        {
            const id = entry.target.animationId;
            const canvas = entry.target.querySelector('canvas');
            const point = pointsInfo[id];
            let state = states[id];

            if (entry.intersectionRatio >= 0.65 &&
                !state.on)
            {
                state.on = true
                lightOn(canvas, point, state);
                animateText(point, true);
            }
            else if (entry.intersectionRatio < 0.6 &&
                state.on &&
                entry.intersectionRect.y === entry.boundingClientRect.y)
            {
                state.on = false;
                switchLight(canvas, point, false);
                animateText(point, false);
            }
        })
}

function initializeObserver()
{
    const observer = new IntersectionObserver(callback,
    {
        root: null,
        threshold: [0.55, 0.65],
    });

    Object.keys(states).forEach((k) =>
    {
        const obj = document.querySelector(k)
        obj.animationId = k;
        observer.observe(obj);
    });
}

function initialize()
{
    initializeObserver();
    initializeCanvases();

    update();

    window.onresize = () =>
    {
        nav.style.transition = '0s';
        Object.values(pointsInfo).forEach((point) =>
        {
            const text = document.querySelector(point.text.textId);
            text.style.transition = '0s';
        });

        update();
    };
}