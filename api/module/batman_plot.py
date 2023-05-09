import batman
import numpy as np

def batman_plot(t0, rp, a, inc, JD, nor_flux, err_flux):
    
    Rsun = 6.96e+8
    Rstar = 0.77 * Rsun

    rp = (6.99e+7*rp)/Rstar
    a = (1.49e+11*a)/Rstar


    params = batman.TransitParams()
    params.t0 = t0  # time of inferior conjunction
    params.per = 3.722465  # orbital period database
    params.rp = rp  # planet radius (in units of stellar radii)
    # Au                     #semi-major axis (in units of stellar radii)
    params.a = a
    params.inc = inc  # orbital inclination (in degrees)
    params.ecc = 0  # eccentricity
    params.w = 80  # longitude of periastron (in degrees)
    params.u = [0.1, 0.3]  # limb darkening coefficients [u1, u2]
    params.limb_dark = "quadratic"  # limb darkening model
    # t = np.linspace(-0.05, 0.05, 100)
    t = np.linspace(JD[0], JD[-1], len(JD))
    m = batman.TransitModel(params, t)  # initializes model
    flux = m.light_curve(params)  # calculates light curve
    chi2 = np.sum((np.array(nor_flux) - flux) ** 2 / np.array(err_flux) ** 2)
    return {
        "t": list(t),
        "flux": list(flux),
        "chi2": chi2,
    }
