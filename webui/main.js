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
	for(let i = 0;i < 7;i++)
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

let octaves = 7;
let ctx,canvas;
let repaint_animation_frame;
let notes = [
{
"begin_delta": 271,
"end_delta": 576,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 724,
"end_delta": 864,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 1015,
"end_delta": 1148,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 1148,
"end_delta": 1295,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 1447,
"end_delta": 1572,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 2678,
"end_delta": 2800,
"octave": 5,
"keytype": 0,
"globalIndex": 71,
"relIndex": 11
}
,{
"begin_delta": 3549,
"end_delta": 3692,
"octave": 5,
"keytype": 0,
"globalIndex": 64,
"relIndex": 4
}
,{
"begin_delta": 3998,
"end_delta": 4143,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 4316,
"end_delta": 4438,
"octave": 5,
"keytype": 0,
"globalIndex": 71,
"relIndex": 11
}
,{
"begin_delta": 5047,
"end_delta": 5292,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 5333,
"end_delta": 5441,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 5451,
"end_delta": 5576,
"octave": 6,
"keytype": 0,
"globalIndex": 79,
"relIndex": 7
}
,{
"begin_delta": 5576,
"end_delta": 5766,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 5969,
"end_delta": 6086,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 6086,
"end_delta": 6222,
"octave": 5,
"keytype": 0,
"globalIndex": 71,
"relIndex": 11
}
,{
"begin_delta": 6392,
"end_delta": 6520,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 6679,
"end_delta": 6874,
"octave": 5,
"keytype": 0,
"globalIndex": 64,
"relIndex": 4
}
,{
"begin_delta": 6874,
"end_delta": 6989,
"octave": 5,
"keytype": 1,
"globalIndex": 65,
"relIndex": 5
}
,{
"begin_delta": 7436,
"end_delta": 7559,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 7877,
"end_delta": 8005,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 9362,
"end_delta": 9493,
"octave": 5,
"keytype": 1,
"globalIndex": 61,
"relIndex": 1
}
,{
"begin_delta": 9493,
"end_delta": 9641,
"octave": 5,
"keytype": 1,
"globalIndex": 60,
"relIndex": 0
}
,{
"begin_delta": 9800,
"end_delta": 10017,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 10017,
"end_delta": 10201,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 10206,
"end_delta": 10365,
"octave": 6,
"keytype": 0,
"globalIndex": 79,
"relIndex": 7
}
,{
"begin_delta": 10396,
"end_delta": 10541,
"octave": 6,
"keytype": 0,
"globalIndex": 81,
"relIndex": 9
}
,{
"begin_delta": 10702,
"end_delta": 10867,
"octave": 6,
"keytype": 1,
"globalIndex": 77,
"relIndex": 5
}
,{
"begin_delta": 10867,
"end_delta": 10989,
"octave": 6,
"keytype": 0,
"globalIndex": 79,
"relIndex": 7
}
,{
"begin_delta": 11148,
"end_delta": 11296,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 11457,
"end_delta": 11589,
"octave": 5,
"keytype": 0,
"globalIndex": 64,
"relIndex": 4
}
,{
"begin_delta": 11589,
"end_delta": 11736,
"octave": 5,
"keytype": 1,
"globalIndex": 65,
"relIndex": 5
}
,{
"begin_delta": 12461,
"end_delta": 12636,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 12636,
"end_delta": 12779,
"octave": 6,
"keytype": 1,
"globalIndex": 75,
"relIndex": 3
}
,{
"begin_delta": 12779,
"end_delta": 12914,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 12915,
"end_delta": 13068,
"octave": 6,
"keytype": 1,
"globalIndex": 75,
"relIndex": 3
}
,{
"begin_delta": 13222,
"end_delta": 13358,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 13528,
"end_delta": 13668,
"octave": 5,
"keytype": 1,
"globalIndex": 68,
"relIndex": 8
}
,{
"begin_delta": 13668,
"end_delta": 13809,
"octave": 5,
"keytype": 1,
"globalIndex": 65,
"relIndex": 5
}
,{
"begin_delta": 13818,
"end_delta": 13963,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 14269,
"end_delta": 14423,
"octave": 5,
"keytype": 0,
"globalIndex": 64,
"relIndex": 4
}
,{
"begin_delta": 14423,
"end_delta": 14562,
"octave": 5,
"keytype": 1,
"globalIndex": 65,
"relIndex": 5
}
,{
"begin_delta": 14865,
"end_delta": 15016,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 15016,
"end_delta": 15156,
"octave": 6,
"keytype": 1,
"globalIndex": 75,
"relIndex": 3
}
,{
"begin_delta": 15156,
"end_delta": 15311,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 15311,
"end_delta": 15459,
"octave": 6,
"keytype": 1,
"globalIndex": 75,
"relIndex": 3
}
,{
"begin_delta": 15899,
"end_delta": 16035,
"octave": 6,
"keytype": 0,
"globalIndex": 79,
"relIndex": 7
}
,{
"begin_delta": 16217,
"end_delta": 16487,
"octave": 7,
"keytype": 1,
"globalIndex": 84,
"relIndex": 0
}
,{
"begin_delta": 17234,
"end_delta": 17404,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 17404,
"end_delta": 17546,
"octave": 6,
"keytype": 1,
"globalIndex": 78,
"relIndex": 6
}
,{
"begin_delta": 17688,
"end_delta": 17688,
"octave": 6,
"keytype": 1,
"globalIndex": 77,
"relIndex": 5
}
,{
"begin_delta": 17688,
"end_delta": 17828,
"octave": 6,
"keytype": 1,
"globalIndex": 75,
"relIndex": 3
}
,{
"begin_delta": 17995,
"end_delta": 18131,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 18448,
"end_delta": 18449,
"octave": 5,
"keytype": 1,
"globalIndex": 68,
"relIndex": 8
}
,{
"begin_delta": 18449,
"end_delta": 18582,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 18591,
"end_delta": 18719,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 19179,
"end_delta": 19179,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 19179,
"end_delta": 19337,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 20084,
"end_delta": 20213,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 20494,
"end_delta": 20625,
"octave": 5,
"keytype": 1,
"globalIndex": 60,
"relIndex": 0
}
,{
"begin_delta": 22016,
"end_delta": 22171,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 22171,
"end_delta": 22300,
"octave": 6,
"keytype": 1,
"globalIndex": 78,
"relIndex": 6
}
,{
"begin_delta": 22302,
"end_delta": 22464,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 22464,
"end_delta": 22604,
"octave": 6,
"keytype": 1,
"globalIndex": 75,
"relIndex": 3
}
,{
"begin_delta": 22757,
"end_delta": 22907,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 23066,
"end_delta": 23205,
"octave": 5,
"keytype": 1,
"globalIndex": 68,
"relIndex": 8
}
,{
"begin_delta": 23205,
"end_delta": 23336,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 23347,
"end_delta": 23476,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 23952,
"end_delta": 23952,
"octave": 5,
"keytype": 0,
"globalIndex": 64,
"relIndex": 4
}
,{
"begin_delta": 23952,
"end_delta": 24105,
"octave": 5,
"keytype": 1,
"globalIndex": 65,
"relIndex": 5
}
,{
"begin_delta": 24401,
"end_delta": 24523,
"octave": 6,
"keytype": 0,
"globalIndex": 79,
"relIndex": 7
}
,{
"begin_delta": 24523,
"end_delta": 24688,
"octave": 6,
"keytype": 1,
"globalIndex": 75,
"relIndex": 3
}
,{
"begin_delta": 24688,
"end_delta": 24824,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 24824,
"end_delta": 24977,
"octave": 6,
"keytype": 1,
"globalIndex": 75,
"relIndex": 3
}
,{
"begin_delta": 25445,
"end_delta": 25610,
"octave": 7,
"keytype": 1,
"globalIndex": 84,
"relIndex": 0
}
,{
"begin_delta": 25749,
"end_delta": 25749,
"octave": 6,
"keytype": 0,
"globalIndex": 79,
"relIndex": 7
}
,{
"begin_delta": 25749,
"end_delta": 26036,
"octave": 7,
"keytype": 1,
"globalIndex": 84,
"relIndex": 0
}
,{
"begin_delta": 26771,
"end_delta": 26930,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 26931,
"end_delta": 27078,
"octave": 6,
"keytype": 1,
"globalIndex": 75,
"relIndex": 3
}
,{
"begin_delta": 27078,
"end_delta": 27226,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 27226,
"end_delta": 27359,
"octave": 6,
"keytype": 1,
"globalIndex": 75,
"relIndex": 3
}
,{
"begin_delta": 27516,
"end_delta": 27649,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 27824,
"end_delta": 27967,
"octave": 5,
"keytype": 1,
"globalIndex": 68,
"relIndex": 8
}
,{
"begin_delta": 27967,
"end_delta": 28093,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 28109,
"end_delta": 28257,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 28711,
"end_delta": 28856,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 29634,
"end_delta": 29784,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 30046,
"end_delta": 30171,
"octave": 5,
"keytype": 1,
"globalIndex": 60,
"relIndex": 0
}
,{
"begin_delta": 31232,
"end_delta": 31375,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 31394,
"end_delta": 31525,
"octave": 5,
"keytype": 1,
"globalIndex": 68,
"relIndex": 8
}
,{
"begin_delta": 31679,
"end_delta": 31829,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 31982,
"end_delta": 32169,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 32174,
"end_delta": 32283,
"octave": 5,
"keytype": 1,
"globalIndex": 70,
"relIndex": 10
}
,{
"begin_delta": 32448,
"end_delta": 32567,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 32576,
"end_delta": 32721,
"octave": 5,
"keytype": 0,
"globalIndex": 64,
"relIndex": 4
}
,{
"begin_delta": 32885,
"end_delta": 33016,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 33016,
"end_delta": 33175,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 33654,
"end_delta": 33916,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 34370,
"end_delta": 34526,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 34526,
"end_delta": 34646,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 34655,
"end_delta": 34813,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 36003,
"end_delta": 36290,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 36455,
"end_delta": 36594,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 36755,
"end_delta": 36898,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 36898,
"end_delta": 37040,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 37221,
"end_delta": 37349,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 37658,
"end_delta": 37800,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 37800,
"end_delta": 37934,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 38388,
"end_delta": 38692,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 38828,
"end_delta": 38964,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 39126,
"end_delta": 39411,
"octave": 5,
"keytype": 1,
"globalIndex": 66,
"relIndex": 6
}
,{
"begin_delta": 39562,
"end_delta": 39692,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 40792,
"end_delta": 40919,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 41239,
"end_delta": 41361,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 42721,
"end_delta": 42852,
"octave": 5,
"keytype": 1,
"globalIndex": 70,
"relIndex": 10
}
,{
"begin_delta": 42852,
"end_delta": 42985,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 43362,
"end_delta": 43568,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 43641,
"end_delta": 43755,
"octave": 6,
"keytype": 0,
"globalIndex": 79,
"relIndex": 7
}
,{
"begin_delta": 43755,
"end_delta": 43883,
"octave": 6,
"keytype": 0,
"globalIndex": 81,
"relIndex": 9
}
,{
"begin_delta": 44053,
"end_delta": 44206,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 44206,
"end_delta": 44334,
"octave": 5,
"keytype": 0,
"globalIndex": 71,
"relIndex": 11
}
,{
"begin_delta": 44507,
"end_delta": 44661,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 44800,
"end_delta": 44953,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 45081,
"end_delta": 45081,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 45081,
"end_delta": 45198,
"octave": 5,
"keytype": 0,
"globalIndex": 62,
"relIndex": 2
}
,{
"begin_delta": 45984,
"end_delta": 46103,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 46427,
"end_delta": 46553,
"octave": 5,
"keytype": 0,
"globalIndex": 64,
"relIndex": 4
}
,{
"begin_delta": 47516,
"end_delta": 47625,
"octave": 5,
"keytype": 1,
"globalIndex": 61,
"relIndex": 1
}
,{
"begin_delta": 47628,
"end_delta": 47750,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 47937,
"end_delta": 48180,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 48207,
"end_delta": 48570,
"octave": 5,
"keytype": 0,
"globalIndex": 71,
"relIndex": 11
}
,{
"begin_delta": 48790,
"end_delta": 48980,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 48980,
"end_delta": 49105,
"octave": 5,
"keytype": 0,
"globalIndex": 71,
"relIndex": 11
}
,{
"begin_delta": 49266,
"end_delta": 49422,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 49573,
"end_delta": 49804,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 49804,
"end_delta": 49958,
"octave": 5,
"keytype": 0,
"globalIndex": 71,
"relIndex": 11
}
,{
"begin_delta": 50448,
"end_delta": 50570,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 51501,
"end_delta": 51637,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 51640,
"end_delta": 51774,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 52086,
"end_delta": 52086,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 52086,
"end_delta": 52206,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 52688,
"end_delta": 52888,
"octave": 5,
"keytype": 0,
"globalIndex": 71,
"relIndex": 11
}
,{
"begin_delta": 52889,
"end_delta": 53145,
"octave": 6,
"keytype": 0,
"globalIndex": 81,
"relIndex": 9
}
,{
"begin_delta": 53161,
"end_delta": 53415,
"octave": 6,
"keytype": 0,
"globalIndex": 81,
"relIndex": 9
}
,{
"begin_delta": 53418,
"end_delta": 53535,
"octave": 6,
"keytype": 0,
"globalIndex": 79,
"relIndex": 7
}
,{
"begin_delta": 53549,
"end_delta": 53817,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 53817,
"end_delta": 54131,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 54321,
"end_delta": 54449,
"octave": 5,
"keytype": 1,
"globalIndex": 65,
"relIndex": 5
}
,{
"begin_delta": 54449,
"end_delta": 54596,
"octave": 5,
"keytype": 0,
"globalIndex": 64,
"relIndex": 4
}
,{
"begin_delta": 55054,
"end_delta": 55215,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 55224,
"end_delta": 55352,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 55517,
"end_delta": 55656,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 55965,
"end_delta": 56093,
"octave": 5,
"keytype": 1,
"globalIndex": 68,
"relIndex": 8
}
,{
"begin_delta": 56277,
"end_delta": 56391,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 56394,
"end_delta": 56550,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 56711,
"end_delta": 56840,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 56840,
"end_delta": 56998,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 57447,
"end_delta": 57581,
"octave": 5,
"keytype": 0,
"globalIndex": 71,
"relIndex": 11
}
,{
"begin_delta": 57581,
"end_delta": 57720,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 57890,
"end_delta": 58221,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 58381,
"end_delta": 58381,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 58381,
"end_delta": 58612,
"octave": 4,
"keytype": 0,
"globalIndex": 59,
"relIndex": 11
}
,{
"begin_delta": 58612,
"end_delta": 58779,
"octave": 5,
"keytype": 1,
"globalIndex": 60,
"relIndex": 0
}
,{
"begin_delta": 59826,
"end_delta": 59963,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 59963,
"end_delta": 60122,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 61036,
"end_delta": 61156,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 61156,
"end_delta": 61292,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 61460,
"end_delta": 61599,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 61599,
"end_delta": 61716,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 62203,
"end_delta": 62404,
"octave": 5,
"keytype": 0,
"globalIndex": 71,
"relIndex": 11
}
,{
"begin_delta": 62407,
"end_delta": 62666,
"octave": 6,
"keytype": 0,
"globalIndex": 81,
"relIndex": 9
}
,{
"begin_delta": 62691,
"end_delta": 62950,
"octave": 6,
"keytype": 0,
"globalIndex": 81,
"relIndex": 9
}
,{
"begin_delta": 62950,
"end_delta": 63212,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 63212,
"end_delta": 63391,
"octave": 6,
"keytype": 1,
"globalIndex": 77,
"relIndex": 5
}
,{
"begin_delta": 63544,
"end_delta": 63544,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 63544,
"end_delta": 63697,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 63850,
"end_delta": 63990,
"octave": 5,
"keytype": 1,
"globalIndex": 65,
"relIndex": 5
}
,{
"begin_delta": 63990,
"end_delta": 64146,
"octave": 5,
"keytype": 0,
"globalIndex": 64,
"relIndex": 4
}
,{
"begin_delta": 65494,
"end_delta": 65620,
"octave": 5,
"keytype": 1,
"globalIndex": 68,
"relIndex": 8
}
,{
"begin_delta": 65787,
"end_delta": 65932,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 65932,
"end_delta": 66068,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 66208,
"end_delta": 66375,
"octave": 6,
"keytype": 1,
"globalIndex": 77,
"relIndex": 5
}
,{
"begin_delta": 66375,
"end_delta": 66514,
"octave": 5,
"keytype": 0,
"globalIndex": 69,
"relIndex": 9
}
,{
"begin_delta": 67005,
"end_delta": 67121,
"octave": 5,
"keytype": 0,
"globalIndex": 71,
"relIndex": 11
}
,{
"begin_delta": 67124,
"end_delta": 67266,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 67428,
"end_delta": 67793,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 67793,
"end_delta": 67915,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 68161,
"end_delta": 68287,
"octave": 5,
"keytype": 1,
"globalIndex": 60,
"relIndex": 0
}
,{
"begin_delta": 69334,
"end_delta": 69646,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 69797,
"end_delta": 69947,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 70103,
"end_delta": 70250,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 70253,
"end_delta": 70398,
"octave": 5,
"keytype": 1,
"globalIndex": 70,
"relIndex": 10
}
,{
"begin_delta": 70549,
"end_delta": 70691,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 71000,
"end_delta": 71136,
"octave": 5,
"keytype": 0,
"globalIndex": 64,
"relIndex": 4
}
,{
"begin_delta": 71137,
"end_delta": 71290,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 71747,
"end_delta": 72029,
"octave": 5,
"keytype": 1,
"globalIndex": 68,
"relIndex": 8
}
,{
"begin_delta": 72647,
"end_delta": 72647,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 72647,
"end_delta": 72769,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 74121,
"end_delta": 74419,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 74573,
"end_delta": 74701,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 74876,
"end_delta": 75007,
"octave": 6,
"keytype": 1,
"globalIndex": 72,
"relIndex": 0
}
,{
"begin_delta": 75016,
"end_delta": 75155,
"octave": 6,
"keytype": 0,
"globalIndex": 74,
"relIndex": 2
}
,{
"begin_delta": 75336,
"end_delta": 75464,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 75776,
"end_delta": 75888,
"octave": 5,
"keytype": 0,
"globalIndex": 64,
"relIndex": 4
}
,{
"begin_delta": 75899,
"end_delta": 76038,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
,{
"begin_delta": 76490,
"end_delta": 76795,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 76941,
"end_delta": 77094,
"octave": 6,
"keytype": 0,
"globalIndex": 76,
"relIndex": 4
}
,{
"begin_delta": 77245,
"end_delta": 77529,
"octave": 5,
"keytype": 1,
"globalIndex": 66,
"relIndex": 6
}
,{
"begin_delta": 77676,
"end_delta": 77810,
"octave": 5,
"keytype": 0,
"globalIndex": 67,
"relIndex": 7
}
];

function extn(x,n)
{
	let a = x.toString();
	return "0".repeat(n - a.length) + a;
}

let speed = 0.2;
let epoch = performance.now();
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
	let black_key_press = [].fill(0,0,octaves*5);
	let white_key_press = [].fill(0,0,octaves*7);
	for(let i = 0;i < notes.length && notes[i].bdelta <= delta_now;i++)
	{
		if(notes[i].edelta <= play_line)
		{
			notes.splice(i,1);
			--i;
			continue;
		}
		if(notes[i].keytype == 0)
		{
			ctx.fillStyle = white_note_color;
			ctx.fillRect(notes[i].octave*octave_width+white_key_width*notes[i].index+2,(delta_now - notes[i].edelta)*speed,white_key_width-4,(notes[i].edelta - notes[i].bdelta)*speed);
			let playing = ((delta_now - notes[i].bdelta) > play_line && (delta_now - notes[i].edelta) < play_line);
			if(playing && !notes[i].audio)
			{
				(notes[i].audio = new Audio("piano/" + extn(notes[i].globalIndex,3) + ".wav")).play();
			}
			white_key_press[notes[i].octave * 7 + notes[i].index] |= playing;
		}
		else
		{
			ctx.fillStyle = black_note_color;
			ctx.fillRect(notes[i].octave*octave_width+blackKeyPositionBase[notes[i].index]*scale+2,(delta_now - notes[i].edelta)*speed,black_key_width-4,(notes[i].edelta - notes[i].bdelta)*speed);
			let playing = ((delta_now - notes[i].bdelta) > play_line && (delta_now - notes[i].edelta) < play_line);
			if(playing && !notes[i].audio)
			{
				(notes[i].audio = new Audio("piano/" + extn(notes[i].globalIndex,3) + ".wav")).play();
			}
			black_key_press[notes[i].octave * 5 + notes[i].index] |= playing;
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

let kidx_map = [
	{keytype:0,index:0},
	{keytype:1,index:0},
	{keytype:0,index:1},
	{keytype:1,index:1},
	{keytype:0,index:2},
	{keytype:0,index:3},
	{keytype:1,index:2},
	{keytype:0,index:4},
	{keytype:1,index:3},
	{keytype:0,index:5},
	{keytype:1,index:4},
	{keytype:0,index:6}
]
function normalize_notes(notes)
{
	res = [];
	for(let i = 0;i < notes.length;i++)
	{
		notes[i].globalIndex -= 24;
		res.push({bdelta:notes[i].begin_delta,edelta:notes[i].end_delta,globalIndex:notes[i].globalIndex,octave:Math.floor(notes[i].globalIndex/12),index:kidx_map[notes[i].globalIndex%12].index,keytype:kidx_map[notes[i].globalIndex%12].keytype});
	}
	return res;
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
	notes = normalize_notes(notes);
	requestAnimationFrame(repaint);
}