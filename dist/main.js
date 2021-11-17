const nav = document.querySelector('nav');
const navFade = document.querySelector('#nav-fade')
const transitionTime = 0.6;

let isNavOpen = false;
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

    nav.style.right = `-24vw`;
    navFade.style.backgroundColor = '#211d3300';

    navFade.style.zIndex = 2;

    isNavOpen = false;

    setTimeout(() =>
    {
        if (!isNavOpen) nav.style.transition = '0s';
    }, transitionTime * 1000);
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

const imgRatio = 700/393;
const smallScreenThreshold = 1000;

const introInfo =
    {
        canvasId: '#intro-canvas',
        thresholds: [smallScreenThreshold, Infinity],
        alignment:
        {
            scales: [3/2, 1],
            offsets: [-1/4, -0.255],
            ratio: imgRatio,
        },
        text:
        {
            textId: '#point1-text',
            tops: [0, 1/4],
            lefts: ['50%', '0'],
            widths: ['50%', '100%'],
        },
    };

const pointsInfo = [
    {
        canvasId: '#point1-canvas',
        thresholds: [smallScreenThreshold, Infinity],
        alignment:
        {
            scales: [6/7, 17/24],
            offsets: [1/14, -1/7],
            ratio: imgRatio,
        },
        display:
        {
            img: NaN,
            imgInfo:
            {
                src: './../assets/img/briefcase.png',
                loaded: false,
                scale: 1/2,
            },
            filters:
            {
                'hue-rotate': '0',
                'saturate': '1.9',
                'brightness': '2',
            },
            shadowColor: '#2196F3',
            shadowBlur: 20,
        },
        text:
        {
            textId: '#point1-text',
            tops: [0, 1/10],
            lefts: ['50%', '0'],
            widths: ['50%', '100%'],
        },
    },
    {
        canvasId: '#point2-canvas',
        thresholds: [smallScreenThreshold, Infinity],
        alignment:
        {
            scales: [6/7, 17/24],
            offsets: [1/14, 1 + 1/7 - 17/24],
            ratio: imgRatio,
        },
        display:
        {
            img: NaN,
            imgInfo:
            {
                src: './../assets/img/book.png',
                loaded: false,
                scale: 1/2,
            },
            filters:
            {
                'hue-rotate': '-50deg',
                'saturate': '1.5',
                'brightness': '1.5',
            },
            shadowColor: '#00B8D4',
            shadowBlur: 20,
        },
        text:
        {
            textId: '#point2-text',
            tops: [0, 1/10],
            lefts: ['50%', '0'],
            widths: ['50%', '100%'],
        },
    },
    {
        canvasId: '#point3-canvas',
        thresholds: [smallScreenThreshold, Infinity],
        alignment:
        {
            scales: [6/7, 17/24],
            offsets: [1/14, -1/7],
            ratio: imgRatio,
        },
        display:
        {
            img: NaN,
            imgInfo:
            {
                src: './../assets/img/project.png',
                loaded: false,
                scale: 1/2,
            },
            filters:
            {
                'hue-rotate': '80deg',
                'saturate': '2',
                'brightness': '2',
            },
            shadowColor: '#C51162',
            shadowBlur: 20,
        },
        text:
        {
            textId: '#point3-text',
            tops: [0, 1/10],
            lefts: ['50%', '0'],
            widths: ['50%', '100%'],
        },
    }
];

function loadImage(canvas, displayInfo)
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
    pointsInfo.forEach((point) =>
    {
        loadImage(document.querySelector(point.canvasId), point.display);
    })
}

function resizeCanvas(canvas, thresholds, alignInfo)
{
    const parent = canvas.parentNode;
    const spacing = parent.querySelector('.canvas-spacing');
    const parentWidth = parent.clientWidth;

    for (let i = 0; i < thresholds.length; i++)
    {
        if (parentWidth < thresholds[i])
        {
            canvas.width = parentWidth * alignInfo.scales[i];
            canvas.height = parentWidth * alignInfo.scales[i] / alignInfo.ratio;

            canvas.style.left = `${parentWidth * alignInfo.offsets[i]}px`;

            spacing.style.height = `${parentWidth * alignInfo.scales[i] / alignInfo.ratio}px`;

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

    pointsInfo.forEach((point) =>
    {
        resizeCanvas(document.querySelector(point.canvasId), point.thresholds, point.alignment);
        drawCanvas(document.querySelector(point.canvasId), point.display)
    });
}

const html = document.querySelector('html');
function updateText(textInfo, thresholds)
{
    const text = document.querySelector(textInfo.textId);
    const parent = text.parentNode;
    const parentWidth = parent.clientWidth;

    let top = parent.offsetTop;

    for (let i = 0; i < thresholds.length; i++)
    {
        if (parentWidth < thresholds[i])
        {
            top += parentWidth * textInfo.tops[i];
            text.style.top = `${top}px`;

            break;
        }
    }
}

function updateTexts()
{
    pointsInfo.forEach((point) =>
    {
        updateText(point.text, point.thresholds);
    });
}

function updateMisc()
{
    const transition = document.querySelector('#transition');
    transition.style.height = `${window.innerWidth/100}em`;
}

updateMisc();
initializeCanvases();
updateCanvases();
updateTexts();

window.onresize = () =>
{
    nav.style.transition = '0s';
    if (nav.style.right != '0')
    {
        nav.style.right = '-24vw';
    }

    updateMisc();
    updateCanvases();
    updateTexts();
};