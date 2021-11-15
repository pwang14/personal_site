const nav = document.querySelector('nav');

function openNav()
{
    nav.style.right = '0';
}

function closeNav()
{
    nav.style.right = `-18em`;
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

function resizeCanvas(canvas, alignment)
{
    const parent = canvas.parentNode;
    const parentWidth = parent.clientWidth;

    for (let i = 0; i < alignment.thresholds.length; i++)
    {
        if (parentWidth < alignment.thresholds[i])
        {
            canvas.width = parentWidth * alignment.scales[i];
            canvas.height = parentWidth * alignment.scales[i] / alignment.ratio;

            canvas.style.left = `${parentWidth * alignment.offsets[i]}px`;

            break;
        }
    }
}

function loadImage(canvas, display)
{
    const img = new Image();
    img.src = display.imgInfo.src;
    img.addEventListener('load', () =>
    {
        display.img = img;
        display.imgInfo.loaded = true;

        drawCanvas(canvas, display);
    }, false);
}

function drawCanvas(canvas, display)
{
    if (display.imgInfo.loaded)
    {
        const ctx = canvas.getContext('2d');

        const scale = display.imgInfo.scale;
        const offset = (1 - scale) / 2;

        const filters = display.filters;

        const width = canvas.clientWidth;
        const height= canvas.clientHeight;

        ctx.clearRect(0, 0, width, height);

        canvas.style.filter = Object.keys(filters).map(k => k + '(' + filters[k] + ')').join(' ');

        ctx.shadowColor = display.shadowColor;
        ctx.shadowBlur = display.shadowBlur;

        ctx.drawImage(display.img, offset * width, offset * height, scale * width, scale * height);
    }
}


const imgRatio = 700/393;
const smallScreenThreshold = 1000;

const introInfo =
    {
        id: '#intro-canvas',
        alignment:
        {
            thresholds: [smallScreenThreshold, Infinity],
            scales: [3/2, 6/7],
            offsets: [-1/4, -1/6],
            ratio: imgRatio,
        },
    };

const pointInfo = [
    {
        id: '#point1-canvas',
        alignment:
        {
            thresholds: [smallScreenThreshold, Infinity],
            scales: [6/7, 2/3],
            offsets: [1/14, -1/8],
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
                'saturate': '1.5',
                'brightness': '2',
            },
            shadowColor: '#2196F3',
            shadowBlur: 20,
        },
    },
    {
        id: '#point2-canvas',
        alignment:
        {
            thresholds: [smallScreenThreshold, Infinity],
            scales: [6/7, 2/3],
            offsets: [1/14, 1 + 1/8 - 2/3],
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
    },
    {
        id: '#point3-canvas',
        alignment:
        {
            thresholds: [smallScreenThreshold, Infinity],
            scales: [6/7, 2/3],
            offsets: [1/14, -1/8],
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
    }
];

function updateCanvases()
{
    resizeCanvas(document.querySelector(introInfo.id), introInfo.alignment);

    pointInfo.forEach((canvasInfo) =>
    {
        resizeCanvas(document.querySelector(canvasInfo.id), canvasInfo.alignment);
        drawCanvas(document.querySelector(canvasInfo.id), canvasInfo.display)
    });
}

function initializeCanvases()
{
    pointInfo.forEach((canvasInfo) =>
    {
        loadImage(document.querySelector(canvasInfo.id), canvasInfo.display);
    })
}

initializeCanvases();
updateCanvases();

window.onresize = updateCanvases;