from __future__ import unicode_literals
import youtube_dl
import os

import music21
import matplotlib.pyplot as plt
from midiutil.MidiFile import MIDIFile

from support.noteTranslation import *

# First we convert Youtube video to mp3

print 'Paste the URL of the Youtube video and press [Enter]'
YT_URL = raw_input()

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


        prevPitch = track.pitch

        count = count + 1
    



    filePath = 'output' + str(tracksNum) + '.ly'
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


print 'Generating music-sheet pdf. . .'

# Activate the lilypond script to generate the file
os.system('lilypond output0.ly')
    


print 'Done'
