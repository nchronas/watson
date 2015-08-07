FROM resin/rpi-raspbian:jessie

ENV INITSYSTEM on

# Install Python, pip and the camera module firmware
RUN apt-get update && apt-get install -y --force-yes python \
python-dev \
libraspberrypi-bin \
python-pip \
python-dbus \
iptables \
python-gobject \
net-tools \
dropbear \
nano \
git \
wget \
tar \
usbutils \
libjpeg8-dev \
imagemagick \
alsa-utils \
libasound2-dev \
python-smbus  \
libi2c-dev \
module-init-tools \
unzip \
nodejs \
npm \
&& apt-get clean && rm -rf /var/lib/apt/lists/*

# Install picamera python module using pip
RUN pip install pyconnman

RUN npm install sys watson-developer-cloud

# add the root dir to the /app dir in the container env
COPY . /app

CMD modprobe snd_bcm2835
CMD modprobe bcm2835-v4l2
CMD ["bash", "/app/start.sh"]