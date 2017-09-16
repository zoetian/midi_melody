import music21
import matplotlib.pyplot as plt
from midiutil.MidiFile import MIDIFile
import os

#fp = '../onajikimochi.mid'
fp = '../output/vocaloid0.mid'



printTrackInfo = True
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

	
    if printTrackInfo:
        print mf.tracks
    
    count = 0
    prevPitch = -1

    for eventInd in range(0,numOfEvents):
        # Tracks
        track = mf.tracks[tracksNum].events[eventInd]
        trackType = track.type

        if trackType == 'NOTE_ON':
            y.append(track.pitch)
            x.append(count)

        prevPitch = track.pitch

        count = count + 1
    

    plt.plot(x,y,'ro')
    plt.show()

    x = []
    y = []
            

        
    


