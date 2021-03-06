import music21
import matplotlib.pyplot as plt
from midiutil.MidiFile import MIDIFile
import os

from support.noteTranslation import *

#fp = '../onajikimochi.mid'
fp = '../output/vocaloid0.mid'

# 1 = pitch / number form
# 2 = note form
noteForm = 1


tracknum = 1


mf = music21.midi.MidiFile()
mf.open(fp)
mf.read()
mf.close()


x = []
y = []

print 'Total of ', len(mf.tracks), ' tracks'


for tracksNum in range (0, len(mf.tracks)):
    # Prints out the number of events in a track
    numOfEvents = len(mf.tracks[tracksNum].events)
    print 'Track ', tracksNum
    print 'Number of Events: ', numOfEvents

	
    
    count = 0
    prevPitch = -1

    for eventInd in range(0,numOfEvents):
        # Tracks
        track = mf.tracks[tracksNum].events[eventInd]
        trackType = track.type

        if trackType == 'NOTE_ON':
            y.append(track.pitch)
            x.append(count)

	
	    '''
	    if noteForm == 1:
	    	print track.pitch
	    elif noteForm == 2:
	 	print track.note
	    '''
        prevPitch = track.pitch

        count = count + 1
    


    plt.plot(x,y,'ro')
    plt.show()

    filePath = '../sheet-scripts/sheetScript' + str(tracksNum) + '.ly'
    print filePath
    text_file = open(filePath, 'w')
    text_file.write('{\n')
    for pitch in y:

	note = translateToNote(pitch)
	octave = findOctave(pitch)	

	text_file.write(note)
	text_file.write("'")

	print 'Note ', note , ' at octave ', octave

    text_file.write('}')
    text_file.close()
    x = []
    y = []
            

        
    


