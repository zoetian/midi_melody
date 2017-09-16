import math

def blackOrWhite(pitch):
	if pitch == 2 or pitch == 4 or pitch == 7 or pitch == 9 or pitch == 11:
		# black
		return 0
	else:
		# white
		return 1

def blackWhiteCalculate(pitch):
	octave = findOctave(pitch)
	relPos = pitch - (octave*12)
	return blackOrWhite(relPos)	

def translateToNote(pitch):
	if pitch%12 == 0:
		#  C
		return 'c'
	elif (pitch - 1)%12 == 0:
		#  C#
		return 'cis'
	elif (pitch - 2)%12 == 0:
		#  D
		return 'd'
	elif (pitch - 3)%12 == 0:
		#  D#
		return 'dis'
	elif (pitch - 4)%12 == 0:
		#  E
		return 'e'
	elif (pitch - 5)%12 == 0:
		#  F
		return 'f'
	elif (pitch - 6)%12 == 0:
		#  F#
		return 'fis'
	elif (pitch - 7)%12 == 0:
		#  G
		return 'g'
	elif (pitch - 8)%12 == 0:
		#  G#
		return 'gis'
	elif (pitch - 9)%12 == 0:
		#  A
		return 'a'
	elif (pitch - 10)%12 == 0:
		#  A#
		return 'ais'
	elif (pitch - 11)%12 == 0:
		#  B
		return 'b'
	

def findOctave(pitch):
	return int(math.floor(pitch/12))
