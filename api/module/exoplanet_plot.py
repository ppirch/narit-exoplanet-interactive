import numpy as np

Sun_R = 6.96e8  # unit m


def plot_habit_zone(host_name="Sun", a=1, Albedo=0.36, Stellar_R=1, ST=5778):

    sigma = 5.67e-8  #  W⋅m−2⋅K−4
    Lsun = 3.84e26  # w or J/m^2
    AU = 1.496e11
    pi = np.pi

    # Modify this boundary equation
    def boundary(Stellar_R, Albedo, T_eq):
        L = ((Stellar_R) ** 2) * ((ST / 5778) ** 4) * Lsun
        R = np.sqrt((1 - Albedo) * L / (16 * pi * sigma * (T_eq**4))) 

        return R / AU

    T0 = 273.15 - 30
    T100 = 373.15 - 30

    Rin = boundary(Stellar_R, Albedo, T100)
    # Rin = Rin/AU# Normalize by AU
    Rout = boundary(Stellar_R, Albedo, T0)

    # Rout = Rout/AU

    axis_lim = Rout * 1.5

    axis_lim, Rout, Rin, a * Stellar_R * Sun_R / (AU)
    return {
        'axis_lim': axis_lim,
        'outer_circle': Rout,
        'inner_circle': Rin,
        'planet_semi_major_axis': a * Stellar_R * Sun_R / (AU)
    }
    
    
def plot_exoplanet(
    host_name="HATS-2", a=5.50, ST=5227, R_pl=0.14478, Inc=87.2, Stellar_R=0.898
):
    Sun_R = 6.96e8
    Stellar_R = Stellar_R * Sun_R
    Jupiter_R = 7.15e7
    Impact_params = np.cos(np.radians(Inc)) * a / Stellar_R
    R_pl = R_pl * Stellar_R 
    R_ratio = R_pl / Stellar_R

    position = -1 * Impact_params

    # 30000 Blue
    if ST > 30000:
        color_star = "blue"
    # 10k-30k B-W
    elif ST > 10000:
        color_star = "lightsteelblue"
    # 7500-10k W
    elif ST > 7500:
        color_star = "white"
    # 6k-7.5k Y-W
    elif ST > 6000:
        color_star = "lightyellow"
    # 5.2k-6k Y
    elif ST > 5200:
        color_star = "yellow"
    # 3.7k-5.2k Oran
    elif ST > 3700:
        color_star = "Orange"
    # 1.3k-2.4k Red
    elif ST > 1300:
        color_star = "red"
    # 0.7k-1.3k Magenta
    elif ST > 700:
        color_star = "magenta"
    # <700 Infrared
    elif ST < 700:
        color_star = "palevioletred"

    return {
        'color_star': color_star,
        'position': position,
        'exoplanet_radius_ratio': R_ratio,
        'juipiter_radius_ratio': Jupiter_R / Stellar_R,
    }