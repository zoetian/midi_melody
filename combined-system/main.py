from __future__ import unicode_literals
import youtube_dl
import os

import music21
import matplotlib.pyplot as plt
from midiutil.MidiFile import MIDIFile

from support.noteTranslation import *

import sys

skipMidiConversion = False

outputJSON = None

if not skipMidiConversion:
	# First we convert Youtube video to mp3

	print 'Working with ', sys.argv[1]
	YT_URL = sys.argv[1]

	outputJSON = sys.argv[2]

	'''
	print 'Paste the URL of the Youtube video and press [Enter]'
	YT_URL = raw_input()
	'''
	os.system('rm -r bin')

	os.makedirs('./bin')

	ydl_opts = {
	    'outtmpl': 'bin/output.mp3',
	    'format': 'bestaudio/best',
	    'postprocessors': [{
		'key': 'FFmpegExtractAudio',
		'preferredcodec': 'mp3',
		'preferredquality': '192',
	    }],
	}
	with youtube_dl.YoutubeDL(ydl_opts) as ydl:
	    ydl.download([YT_URL])


	# Then we convert mp3 video to midi
	os.system('python support/audio_to_midi_melodia.py bin/output.mp3 bin/output.mid 60 --smooth 0.25 --minduration 0.1 --jams')



# Use midi to generate lilypond file that will generate music-sheet pdf
fp = 'bin/output.mid'

noteForm = 1

tracknum = 1


mf = music21.midi.MidiFile()
mf.open(fp)
mf.read()
mf.close()


x = []
y = []
deltaBegin = []
deltaEnd = []

print 'Total of ', len(mf.tracks), ' tracks'


for tracksNum in range (0, len(mf.tracks)):
    # Prints out the number of events in a track
    numOfEvents = len(mf.tracks[tracksNum].events)
    print 'Track ', tracksNum
    print 'Number of Events: ', numOfEvents

	
    
    count = 0
    prevPitch = -1

    prevDelta = -1

    totalDelta = 0

    for eventInd in range(0,numOfEvents):
        # Tracks
        track = mf.tracks[tracksNum].events[eventInd]
        trackType = track.type

	print track

        if trackType == 'NOTE_ON':
            y.append(track.pitch)
            x.append(count)
	
	if trackType == 'NOTE_OFF':	
	    deltaBegin.append(totalDelta - prevDelta)
	    deltaEnd.append(totalDelta)
	
	if trackType == 'DeltaTime':
		deltaTime = track.time
		totalDelta = totalDelta + deltaTime
		prevDelta = deltaTime

        prevPitch = track.pitch

        count = count + 1
    
	


    filePath = 'output' + str(tracksNum) + '.ly'
    print filePath
    text_file = open(filePath, 'w')
    text_file.write('{\n')

    js_file = open(outputJSON,'w')
    js_file.write('let notes = [\n')

    json_file = open('output.json','w')
    json_file.write('{"song":[\n')

    count = 0

    for pitch in y:
	# Write ly file
	note = translateToNote(pitch)
	octave = findOctave(pitch)	

	text_file.write(note)
	text_file.write("'")


	# Write json file
	if count == 0:
		json_file.write('{\n')
		js_file.write('{\n')
	else:
		json_file.write(',{\n')
		js_file.write(',{\n')

	beginDeltaStr = '"begin_delta": ' +  str(deltaBegin[count]) + ',\n'
	json_file.write(beginDeltaStr)
	js_file.write(beginDeltaStr)

	endDeltaStr = '"end_delta": ' + '' + str(deltaEnd[count]) + ',\n'
	json_file.write(endDeltaStr)
	js_file.write(endDeltaStr)
	

	octaveStr = '"octave": ' + ''+ str(octave) +',\n'
	json_file.write(octaveStr)
	js_file.write(octaveStr)


        keyTypeStr = '"keytype": ' + str(blackWhiteCalculate(pitch)) +',\n'
	json_file.write(keyTypeStr)
	js_file.write(keyTypeStr)


        indexStr = '"globalIndex": ' + str(pitch) +',\n'
        json_file.write(indexStr)
        js_file.write(indexStr)

	relPitch = pitch%12

        indexStr = '"relIndex": ' +  str(relPitch) +'\n'
        json_file.write(indexStr)
        js_file.write(indexStr)



    	json_file.write('}\n')
    	js_file.write('}\n')

	count = count + 1

	#print 'Note ', note , ' at octave ', octave


    json_file.write(']}\n')
    js_file.write('];\n')
    
    json_file.close()
    js_file.close()

    text_file.write('}')
    text_file.close()
    x = []
    y = []


print 'Generating music-sheet pdf. . .'

# Activate the lilypond script to generate the file
os.system('lilypond output0.ly')
    


print 'Done'
