import glob
from setuptools import setup
import os

package_name = 'planner'

setup(
    name=package_name,
    version='0.0.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name), glob('launch/*.launch.py')),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='Carlos',
    maintainer_email='carlosjoel.tavares@gmail.com',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'planner = planner.planner_node:main',
            'coordinator = planner.coordinator_node:main',
            'nurse = planner.nurse_node:main',
            'robot = planner.robot_node:main',
            'arm = planner.arm_node:main',
            'environment = planner.environment_node:main',
        ],
    },
)
