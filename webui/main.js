const keyHeightBase = 7;
const keyWidthBase = 1.1;
const blackKeyWidthBase = 0.6 * keyWidthBase;
const blackKeyHeightBase = 0.6 * keyHeightBase;
const pressedWhiteColor = "rgb(214,199,41)";
const pressedBlackColor = "rgb(214,199,41)";

function drawOctaveWhite(ctx,x,y,scale)
{
	const keyWidth = keyWidthBase * scale;
	const keyHeight = keyHeightBase * scale;
	ctx.fillStyle = "white";
	ctx.fillRect(x,y,keyWidth*7,keyHeight);
	ctx.fillStyle = "black";
	for(let i = 0;i <= 7;i++)
	{
		ctx.fillRect(x+i*keyWidth-1,y,2,keyHeight);
	}
}

function drawOctaveWhitePressed(ctx,x,y,scale,pressed)
{
	const keyWidth = keyWidthBase * scale;
	const keyHeight = keyHeightBase * scale;
	ctx.fillStyle = pressedWhiteColor;
	for(let i = 0;i <= 7;i++)
	{
		if(pressed[i])
			ctx.fillRect(x+i*keyWidth+1,y,keyWidth-2,keyHeight-2);
	}
}

function drawOctaveBlack(ctx,x,y,scale)
{
	const keyWidth = keyWidthBase * scale;
	const keyHeight = keyHeightBase * scale;
	const blackKeyWidth = blackKeyWidthBase * scale;
	const blackKeyHeight = blackKeyHeightBase * scale;
	ctx.fillStyle = "black";
	for(let i = 1;i < 7;i++)
	{
		if(i != 3)
		{
			ctx.fillRect(x+i*keyWidth-blackKeyWidth/2,y,blackKeyWidth,blackKeyHeight);
		}
	}
}

function drawOctaveBlackPressed(ctx,x,y,scale,pressed)
{
	const keyWidth = keyWidthBase * scale;
	const keyHeight = keyHeightBase * scale;
	const blackKeyWidth = blackKeyWidthBase * scale;
	const blackKeyHeight = blackKeyHeightBase * scale;
	ctx.fillStyle = pressedBlackColor;
	for(let i = 1,j = 0;i < 7;i++)
	{
		if(i != 3){
			if(pressed[j])
				ctx.fillRect(x+i*keyWidth-blackKeyWidth/2+2,y,blackKeyWidth-4,blackKeyHeight-2);
			j++;
		}
	}
}

let octaves = 5;
let ctx,canvas;
let repaint_animation_frame;
let notes = [{bdelta:0,edelta:1000,octave:0,keytype:0,index:2},{bdelta:600,edelta:1500,octave:0,keytype:1,index:4}];
let epoch = performance.now();
let speed = 0.2;
let scale,octave_y,play_line;
let octave_width,octave_height,white_key_width,black_key_width;
let blackKeyPositionBase = [keyWidthBase-blackKeyWidthBase/2,keyWidthBase*2-blackKeyWidthBase/2,keyWidthBase*4-blackKeyWidthBase/2,keyWidthBase*5-blackKeyWidthBase/2,keyWidthBase*6-blackKeyWidthBase/2];
function repaint(time)
{
	ctx.fillStyle = "rgb(48,48,48)";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	let white_note_color = "rgb(242,231,156)";
	let black_note_color = "rgb(206,194,2)";
	let delta_now = time - epoch;
	let black_key_press = [];
	let white_key_press = [];
	for(let i = 0;i < notes.length && notes[i].bdelta <= delta_now;i++)
	{
		if(notes[i].keytype == 1)
		{
			ctx.fillStyle = white_note_color;
			ctx.fillRect(notes[i].octave*octave_width+white_key_width*notes[i].index+2,(delta_now - notes[i].edelta)*speed,white_key_width-4,(notes[i].edelta - notes[i].bdelta)*speed);
			white_key_press[notes[i].octave * 7 + notes[i].index] = (delta_now - notes[i].bdelta) > play_line && (delta_now - notes[i].edelta) < play_line;
		}
		else
		{
			ctx.fillStyle = black_note_color;
			ctx.fillRect(notes[i].octave*octave_width+blackKeyPositionBase[notes[i].index]*scale+2,(delta_now - notes[i].edelta)*speed,black_key_width-4,(notes[i].edelta - notes[i].bdelta)*speed);
			black_key_press[notes[i].octave * 5 + notes[i].index] = (delta_now - notes[i].bdelta) > play_line && (delta_now - notes[i].edelta) < play_line;
		}
	}
	for(let i = 0;i < octaves;i++)
	{
		drawOctaveWhite(ctx,i*octave_width,octave_y,scale);
		drawOctaveWhitePressed(ctx,i*octave_width,octave_y,scale,white_key_press.slice(i*7,(i+1)*7));
		drawOctaveBlack(ctx,i*octave_width,octave_y,scale);
		drawOctaveBlackPressed(ctx,i*octave_width,octave_y,scale,black_key_press.slice(i*5,(i+1)*5));
	}
	repaint_animation_frame = requestAnimationFrame(repaint);
}

window.onload = function(){
	canvas = document.getElementById("mainCanvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	scale = canvas.width / (7 * keyWidthBase * octaves);
	octave_width = scale * keyWidthBase * 7;
	octave_height = scale * keyHeightBase;
	white_key_width = keyWidthBase * scale;
	black_key_width = blackKeyWidthBase * scale;
	octave_y = canvas.height - octave_height;
	play_line = octave_y / speed;
	ctx = canvas.getContext("2d");
	requestAnimationFrame(repaint);
}