const nav = document.querySelector('nav');
const navFade = document.querySelector('#nav-fade')
const transitionTime = 0.6;

const imgRatio = 700/393;
const smallScreenThreshold = 1000;

let navInfo =
{
    thresholds: [smallScreenThreshold, Infinity],
    widths: [40, 19],
    items:
    {
        lefts: ['2vw', '1.4vw'],
        widths: ['20vw', '10vw'],
        sizes: ['2.5vw', '1.5vw'],
    },
    button:
    {
        widths: ['3.5vw', '1.6vw'],
        heights: ['0.75vw', '0.4vw'],
        margins: ['1.1vw', '0.5vw'],
    },
};

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

            const list = nav.querySelector('ul');
            list.style.left = navInfo.items.lefts[i];
            list.style.fontSize = navInfo.items.sizes[i];

            const items = nav.querySelectorAll('li');
            items.forEach((li) =>
            {
                li.style.width = navInfo.items.widths[i];
            });

            const bars = document.querySelectorAll('#menu-button .bar');
            bars.forEach((bar) =>
            {
                bar.style.width = navInfo.button.widths[i];
                bar.style.height = navInfo.button.heights[i];
                bar.style.margin = navInfo.button.margins[i] + ' 0';
            })

            break;
        }
    }
}

updateNav();

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

let introInfo =
{
    canvasId: '#intro-canvas',
    thresholds: [smallScreenThreshold, Infinity],
    alignment:
    {
        scales: [1.5, 1],
        offsets: [-0.25, -0.255],
        ratio: imgRatio,
        spacing: [2.25, 0.8],
    },
    text:
    {
        textId: '#intro-text',
        tops: [0.65, 0.08],
        lefts: ['16%', '49%'],
        widths: ['70%', '42%'],
        sizes: [2.8, 2],
        h1Ratio: 4.75/2,
    },
};

let pointsInfo =
{
    '#point1':
    {
        id: '#point1',
        canvasId: '#point1-canvas',
        thresholds: [smallScreenThreshold, Infinity],
        alignment:
        {
            scales: [0.86, 0.71],
            offsets: [0.071, -0.14],
            ratio: imgRatio,
            spacing: [1.35, 0.71],
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
        },
        displayOn:
        {
            filters:
            {
                'hue-rotate': '0',
                'saturate': '1.9',
                'brightness': '2',
            },
            shadowColor: '#2196F3',
            shadowBlur: 20,
        },
        displayOff:
        {
            filters:
            {
                'hue-rotate': '0',
                'saturate': '0.5',
                'brightness': '1',
            },
            shadowBlur: 0,
        },
        text:
        {
            textId: '#point1-text',
            tops: [0.45, 0.1],
            widths: ['72%', '50%'],
            sizes: [2, 1.5],
            h1Ratio: 3.5/1.5,
        },
        textVisible:
        {
            lefts: ['15%', '40%'],
            opacity: 1,
        },
        textInvisible:
        {
            lefts: ['40%', '60%'],
            opacity: 0,
        },
    },
    '#point2':
    {
        id: '#point2',
        canvasId: '#point2-canvas',
        thresholds: [smallScreenThreshold, Infinity],
        alignment:
        {
            scales: [0.86, 0.71],
            offsets: [0.071, 2 - 0.86 - 0.71],
            ratio: imgRatio,
            spacing: [1.35, 0.71],
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
        },
        displayOn:
        {
            filters:
            {
                'hue-rotate': '-50deg',
                'saturate': '1.5',
                'brightness': '1.5',
            },
            shadowColor: '#00B8D4',
            shadowBlur: 20,
        },
        displayOff:
        {
            filters:
            {
                'hue-rotate': '-50deg',
                'saturate': '0.5',
                'brightness': '1',
            },
            shadowBlur: 0,
        },
        text:
        {
            textId: '#point2-text',
            tops: [0.45, 0.1],
            widths: ['72%', '50%'],
            sizes: [2, 1.5],
            h1Ratio: 3.5/1.5,
        },
        textVisible:
        {
            lefts: ['15%', '12%'],
            opacity: 1,
        },
        textInvisible:
        {
            lefts: ['-10%', '-8%'],
            opacity: 0,
        },
    },
    '#point3':
    {
        id: '#point3',
        canvasId: '#point3-canvas',
        thresholds: [smallScreenThreshold, Infinity],
        alignment:
        {
            scales: [0.86, 0.71],
            offsets: [0.071, -0.14],
            ratio: imgRatio,
            spacing: [1.35, 0.71],
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
        },
        displayOn:
        {
            filters:
            {
                'hue-rotate': '80deg',
                'saturate': '2',
                'brightness': '2',
            },
            shadowColor: '#C51162',
            shadowBlur: 20,
        },
        displayOff:
        {
            filters:
            {
                'hue-rotate': '80deg',
                'saturate': '0.4',
                'brightness': '1',
            },
            shadowBlur: 0,
        },
        text:
        {
            textId: '#point3-text',
            tops: [0.45, 0.1],
            widths: ['72%', '50%'],
            sizes: [2, 1.5],
            h1Ratio: 3.5/1.5,
        },
        textVisible:
        {
            lefts: ['15%', '40%'],
            opacity: 1,
        },
        textInvisible:
        {
            lefts: ['40%', '60%'],
            opacity: 0,
        },
    }
};

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
    Object.values(pointsInfo).forEach((point) =>
    {
        Object.assign(point.display, point.displayOff);
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
            text.style.left = textInfo.lefts[i];

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

Object.values(pointsInfo).forEach((point) =>
{
    Object.assign(point.text, point.textInvisible);
});

function updateMisc()
{
}

updateMisc();
initializeCanvases();
updateCanvases();
updateTexts();

window.onresize = () =>
{
    nav.style.transition = '0s';
    Object.values(pointsInfo).forEach((point) =>
    {
        const text = document.querySelector(point.text.textId);
        text.style.transition = '0s';
    });

    updateNav();

    updateMisc();
    updateCanvases();
    updateTexts();
};

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

const transition = document.querySelector('#transition');